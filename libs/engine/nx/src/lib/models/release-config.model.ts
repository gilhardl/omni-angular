/**
 * Configuration for the nx release commands.
 */
export interface NxReleaseConfig {
  groups?: {
    [k: string]: {
      projectsRelationship?: 'fixed' | 'independent';
      projects: [string, ...string[]] | string;
      version?: NxReleaseVersionConfig & {
        [k: string]: unknown;
      };
      changelog?: NxReleaseChangelogConfig | false;
      releaseTagPattern?: string;
      [k: string]: unknown;
    };
  };
  changelog?: {
    workspaceChangelog?: NxReleaseChangelogConfig | false;
    projectChangelogs?: NxReleaseChangelogConfig | false;
    [k: string]: unknown;
  };
  projectsRelationship?: 'fixed' | 'independent';
  git?: NxReleaseGitConfig;
  version?: NxReleaseVersionConfig;
  releaseTagPattern?: string;
}

export interface NxReleaseVersionConfig {
  generator?: string;
  generatorOptions?: {
    [k: string]: unknown;
  };
  git?: NxReleaseGitConfig;
  [k: string]: unknown;
}

export interface NxReleaseGitConfig {
  /**
   * Whether or not to automatically commit the changes made by current command
   */
  commit?: boolean;
  /**
   * Custom git commit message to use when committing the changes made by this command
   */
  commitMessage?: string;
  /**
   * Additional arguments (added after the --message argument, which may or may not be customized with --git-commit-message) to pass to the `git commit` command invoked behind the scenes
   */
  commitArgs?: string;
  /**
   * Whether or not to automatically tag the changes made by this command
   */
  tag?: boolean;
  /**
   * Custom git tag message to use when tagging the changes made by this command. This defaults to be the same value as the tag itself.
   */
  tagMessage?: string;
  /**
   * Additional arguments to pass to the `git tag` command invoked behind the scenes
   */
  tagArgs?: string;
  [k: string]: unknown;
}

export interface NxReleaseChangelogConfig {
  createRelease?: 'github' | false;
  entryWhenNoChanges?: string | false;
  file?: string | false;
  renderer?: string;
  renderOptions?: NxChangelogRenderOptions;
  [k: string]: unknown;
}

export interface NxChangelogRenderOptions {
  [k: string]: unknown;
}
