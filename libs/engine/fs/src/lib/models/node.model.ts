import { FsNodeType } from './node.enum';

/**
 * A node in a file system tree.
 */
export interface FsNode {
  type: FsNodeType;
  name: string;
  path: string;
}

/**
 * A file in a file system tree.
 */
export interface FsFile extends FsNode {
  type: FsNodeType.File;
  content?: string;
}

/**
 * A direcotry in a file system tree.
 */
export interface FsDirectory extends FsNode {
  type: FsNodeType.Directory;
  children: FsNode[];
}
