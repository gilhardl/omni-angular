import { Injectable } from '@nestjs/common';

import { FsNode } from '../models/node.model';

/**
 * Platform-specific file system adapter.
 */
@Injectable()
export abstract class FsAdapter {
  /**
   * Read a directory content at given path.
   *
   * @param path directory path to read on the host file system
   */
  abstract readDirectory(path: string): FsNode[];

  /**
   * Read a file content at given path.
   *
   * @param path file path to read on the host file system
   */
  abstract readFile(path: string): string;
}
