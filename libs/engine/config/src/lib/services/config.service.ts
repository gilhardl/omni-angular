import { Injectable } from '@nestjs/common';
import { ensureDirSync } from 'fs-extra';
import { join, resolve } from 'path';

/**
 * Service to access Omni configuration.
 */
@Injectable()
export class ConfigService {
  /**
   * The path to the omni home directory in the host file system.
   *
   * The Omni home directory is used to store omni configuration and database.
   *
   * The default value is `~/.omni`.
   * It can be overrided using the OMNI_HOME environment variable.
   */
  public get omniHome(): string {
    return resolve(process.env['OMNI_HOME'] || `${process.env['HOME']}/.omni`);
  }

  /**
   * The path to the omni database directory in the host file system.
   */
  public get dbRoot(): string {
    return join(this.omniHome, 'database');
  }

  constructor() {
    ensureDirSync(this.omniHome);
  }
}
