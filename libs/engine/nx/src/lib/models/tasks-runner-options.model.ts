/**
 * Available Task Runners.
 */
export interface NxTasksRunnerOptions {
  /**
   * Path to resolve the runner.
   */
  runner?: string;
  /**
   * Default options for the runner.
   */
  options?: {
    accessToken?: string;
    /**
     * Defines whether the cache captures stderr or just stdout.
     */
    captureStderr?: boolean;
    /**
     * Defines the max number of targets ran in parallel.
     */
    parallel?: number;
    /**
     * Defines the list of targets/operations that are cached by Nx.
     */
    cacheableOperations?: string[];
    /**
     * Defines where the local cache is stored.
     */
    cacheDirectory?: string;
    /**
     * Defines whether the Nx Cache should be skipped.
     */
    skipNxCache?: boolean;
    /**
     * Defines an encryption key to support end-to-end encryption of your cloud cache. You may also provide an environment variable with the key NX_CLOUD_ENCRYPTION_KEY that contains an encryption key as its value. The Nx Cloud task runner normalizes the key length, so any length of key is acceptable.
     */
    encryptionKey?: string;
    [k: string]: unknown;
  };
}
