export type NxPlugins =
  | string
  | {
      /**
       * The plugin module to load
       */
      plugin?: string;
      /**
       * The options passed to the plugin when creating nodes and dependencies
       */
      options?: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
