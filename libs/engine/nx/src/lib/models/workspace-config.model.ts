import { NxCliOptions } from './cli-options.model';
import { NxGeneratorOptions } from './generator-options.model';
import { NxInputs } from './inputs.type';
import { NxPlugins } from './plugins.type';
import { NxReleaseConfig } from './release-config.model';
import { NxTargetDefaultsConfig } from './target-defaults-config.model';
import { NxTasksRunnerOptions } from './tasks-runner-options.model';

/**
 * Nx workspace configuration.
 */
export interface NxWorkspaceConfiguration {
  /**
   * Default options for `nx affected`.
   */
  affected?: {
    /**
     * Default based branch used by affected commands.
     */
    defaultBase?: string;
  };

  /**
   * Available Task Runners.
   */
  tasksRunnerOptions?: {
    [k: string]: NxTasksRunnerOptions;
  };

  /**
   * Named inputs used by inputs defined in targets
   */
  namedInputs?: {
    [k: string]: NxInputs;
  };

  /**
   * Target defaults
   */
  targetDefaults?: {
    [k: string]: NxTargetDefaultsConfig;
  };

  /**
   * Where new apps + libs should be placed.
   */
  workspaceLayout?: {
    /**
     * Default folder name for libs.
     */
    libsDir?: string;
    /**
     * Default folder name for apps.
     */
    appsDir?: string;
  };

  /**
   * Default generator collection.
   */
  cli?: NxCliOptions;

  /**
   * List of default values used by generators.
   */
  generators?: NxGeneratorOptions;

  /**
   * Plugins for extending the project graph.
   */
  plugins?: NxPlugins[];

  /**
   * Default project. When project isn't provided, the default project will be used.
   */
  defaultProject?: string;

  /**
   * The access token to use for nx-cloud. If set, the default tasks runner will be nx-cloud.
   */
  nxCloudAccessToken?: string;

  /**
   * Specifies the url pointing to an instance of nx cloud. Used for remote caching and displaying run links.
   */
  nxCloudUrl?: string;

  /**
   * Specifies the encryption key used to encrypt artifacts data before sending it to nx cloud.
   */
  nxCloudEncryptionKey?: string;

  /**
   * Specifies how many tasks are ran in parallel by Nx for the default tasks runner.
   */
  parallel?: number;

  /**
   * Specifies the default location of the cache directory.
   */
  cacheDirectory?: string;

  /**
   * Specifies whether the daemon should be used for the default tasks runner.
   */
  useDaemonProcess?: boolean;

  /**
   * Configuration for the nx release commands.
   */
  release?: NxReleaseConfig;

  [k: string]: unknown;
}
