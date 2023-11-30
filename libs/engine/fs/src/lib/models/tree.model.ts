import { FsNode } from './node.model';

/**
 * A file system tree.
 */
export interface FsTree {
  /**
   * The root path of the file system tree in the host file system.
   */
  root: string;

  /**
   * File system tree root nodes
   */
  children: FsNode[];
}
