/**
 * Default generator collection.
 */
export interface NxCliOptions {
  /**
   * The default package manager to use.
   */
  packageManager?: 'yarn' | 'pnpm' | 'npm';
  [k: string]: unknown;
}
