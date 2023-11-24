import { Injectable } from '@nestjs/common';
import { FsNodeType } from '../models/node.enum';
import { FsDirectory, FsFile, FsNode } from '../models/node.model';
import { FsTree } from '../models/tree.model';
import { produce } from 'immer';
import { join } from 'path';
import { FsAdapter } from './fs.adapter';

/**
 * Virtual file system service.
 *
 * This is an abstract class which is extended by the platform-specific
 * implementations.
 *
 * @see NodeFsService
 */
@Injectable()
export class FsService {
  constructor(private readonly adapter: FsAdapter) {}

  /**
   * Load virtual file system's tree from the host directory at given path.
   *
   * @param root the file system root path in the host file system.
   * @returns file or directory at the given path
   */
  async loadTree(root: string): Promise<FsTree> {
    return {
      root,
      children: this.readPlatformDirectory(root),
    };
  }

  /**
   * Find a file or directory at given path.
   *
   * @param tree the file system tree to look for
   * @param path path to the file or directory in the file system
   * @returns file or directory at the given path
   */
  async get(tree: FsTree, path: string): Promise<FsNode> {
    const pathParts = path.split('/').filter((part) => part !== '');
    if (pathParts.length === 0) throw new Error(`${path} : Invalid path`);

    const firstNode = tree.children.find((node) => node.name === pathParts[0]);
    if (!firstNode) throw new Error(`${path} : No such file or directory`);

    if (pathParts.length === 1) return firstNode;

    let nodes = tree.children;
    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];
      const isLastPart = i === pathParts.length - 1;

      const node = nodes.find((node) => node.name === part);
      if (!node) break;

      if (node.type === FsNodeType.File) {
        if (isLastPart) return node;
        else throw new Error(`${path} : Not a directory`);
      }

      nodes = (node as FsDirectory).children;
      if (isLastPart) return node;
    }
    throw new Error(`${path} : No such file or directory`);
  }

  /**
   * Parse a host directory into a list of virtual file system nodes. This
   * is used to create the virtual file system tree from the host file system.
   *
   * @param directory directory path to parse in the host file system
   * @param fsRoot the virtual file system root path in the host file system
   * @param path directory path in the virtual file system
   * @returns list of virtual file system nodes representing the host directory
   */
  private readPlatformDirectory(
    directory: string,
    fsRoot: string = directory,
    path?: string | undefined
  ): FsNode[] {
    return this.adapter
      .readDirectory(directory)
      .filter((entry) => this.filterNode(entry.name))
      .map((entry) => this.readPlatformNode(entry, fsRoot, path));
  }

  /**
   * Parse a host file system entry (file or directory) into a virtual file
   * system node.
   *
   * @param node host file system entry to parse
   * @param fsRoot the virtual file system root path in the host file system
   * @param parent parent directory path in the virtual file system
   * @returns virtual file system node representing the host file system entry
   */
  private readPlatformNode(
    node: FsNode,
    fsRoot: string,
    parent: string = ''
  ): FsNode {
    const platformPath = join(fsRoot, parent, node.name);
    return produce(node, (draft: FsNode) => {
      draft.path = join(parent, node.name);
      if (node.type === FsNodeType.Directory) {
        (draft as FsDirectory).children = this.readPlatformDirectory(
          platformPath,
          fsRoot,
          draft.path
        );
      }
    });
  }

  /**
   * Read a file or directory (read all child files and directories
   * recursively) at given path.
   *
   * @param tree the file system tree to read from
   * @param path path to the file or directory in the file system
   * @returns file or directory at the given path
   */
  async read(tree: FsTree, path?: string): Promise<FsTree | FsNode> {
    if (!path) return this.readNode(tree.root, tree);

    return this.readNode(tree.root, await this.get(tree, path));
  }

  /**
   * Recursively read given nodes content and their children.
   *
   * @param nodes nodes to read
   * @returns nodes with content
   */
  private readNodes(fsRoot: string, nodes: FsNode[]): FsNode[] {
    return nodes.map((child) => this.readNode(fsRoot, child) as FsNode);
  }

  /**
   * Recursively read given node.
   *
   * @param node node to read
   * @returns file populated with its content or directory with readed children
   */
  private readNode(fsRoot: string, node: FsNode | FsTree): FsNode | FsTree {
    if ('type' in node) {
      if (node.type === FsNodeType.Directory) {
        return produce(node, (draft: FsDirectory) => {
          draft.children = this.readNodes(fsRoot, draft.children);
        });
      } else {
        return produce(node, (draft: FsFile) => {
          draft.content = this.adapter.readFile(join(fsRoot, draft.path));
        });
      }
    } else {
      return produce(node, (draft: FsTree) => {
        draft.children = this.readNodes(fsRoot, draft.children);
      });
    }
  }

  /**
   * Utility method used by the platform-specific implementations to
   * filter out unwanted files and directories from the tree.
   *
   * @param nodeName file system node name to filter
   * @returns wether the node should be included in the tree or not
   */
  private filterNode(nodeName: string): boolean {
    // TODO: .git should be the only hard-coded filter, node_modules and .nx should be filtered like any other .gitignore rules
    return !['.git', 'node_modules', '.nx'].includes(nodeName);
  }
}
