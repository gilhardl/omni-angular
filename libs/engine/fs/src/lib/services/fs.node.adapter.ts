import { readFileSync, readdirSync } from 'fs-extra';
import { join } from 'path';

import { FsNodeType } from '../models/node.enum';
import { FsNode } from '../models/node.model';
import { FsAdapter } from './fs.adapter';

/**
 * NodeJs file system adapter.
 */
export class FsNodeAdapter extends FsAdapter {
  /**
   * Read a directory content at given path.
   *
   * @param path directory path to read on the host file system
   */
  readDirectory(path: string): FsNode[] {
    return readdirSync(path, { withFileTypes: true }).map((entry) => ({
      type: entry.isDirectory() ? FsNodeType.Directory : FsNodeType.File,
      name: entry.name,
      path: join(path, entry.name),
    }));
  }

  /**
   * Read a file content at given path.
   *
   * @param path file path to read on the host file system
   */
  readFile(path: string): string {
    return readFileSync(path, 'utf8');
  }
}
