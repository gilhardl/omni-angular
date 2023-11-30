export type NxInputs = (
  | string
  | {
      /**
       * A glob
       */
      fileset?: string;
    }
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
  | {
      /**
       * The command that will be executed and the results of which is added to the hash
       */
      runtime?: string;
    }
  | {
      /**
       * The name of the env var which value is added to the hash
       */
      env?: string;
    }
  | {
      /**
       * The list of external dependencies that our target depends on for `nx:run-commands` and community plugins.
       */
      externalDependencies?: string[];
    }
  | {
      /**
       * The glob list of output files that project depends on.
       */
      dependentTasksOutputFiles: string;
      /**
       * Whether the check for outputs should be recursive or stop at the first level of dependencies.
       */
      transitive?: boolean;
    }
)[];
