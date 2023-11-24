import { NxInputs } from './inputs.type';

/**
 * Target defaults
 */
export interface NxTargetDefaultsConfig {
  /**
   * The function that Nx will invoke when you run this target
   */
  executor?: string;
  options?: {
    [k: string]: unknown;
  };
  outputs?: string[];
  /**
   * The name of a configuration to use as the default if a configuration is not provided
   */
  defaultConfiguration?: string;
  /**
   * provides extra sets of values that will be merged into the options map
   */
  configurations?: {
    [k: string]: {
      [k: string]: unknown;
    };
  };
  inputs?: NxInputs;
  dependsOn?: (
    | string
    | (
        | {
            [k: string]: unknown;
          }
        | {
            [k: string]: unknown;
          }
        | {
            [k: string]: unknown;
          }
      )
  )[];
  /**
   * Specifies if the given target should be cacheable
   */
  cache?: boolean;
}
