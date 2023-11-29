# Omni monorepo

Omni source code is all in this monorepo with Nx as fundations.

## Overview

### Workspace Nx projects

```
┌── apps
│   ├── api - @omni/api
│   ├── cli - @omni/cli
│   └── studio
│       ├── web - @omni/studio-web
│       └── desktop - @omni/studio-desktop
├── libs
│   ├── api
│   │   └── core - @omni/api/core
│   ├── common
│   │   └── app - @omni/common/app
│   ├── core
│   │   ├── config - @omni/core/config
│   │   ├── database - @omni/core/database
│   │   ├── filesystem - @omni/core/filesystem
│   │   ├── workspaces - @omni/core/workspaces
│   │   └── nx - @omni/core/nx
│   ├── starter
│   │   └── home
│   │       └── feature - @omni/starter/home-feature
│   ├── studio
│   │   ├── core - @omni/studio/core
│   │   └── api-client - @omni/studio/api-client
│   └── ui
│       ├── button - @omni/ui/button
│       ├── card - @omni/ui/card
│       ├── form - @omni/ui/form
│       └── ...
├── packages
│   ├── common - @omni/common
│   ├── create-omni-workspace - @omni/create-omni-workspace
│   ├── nx - @omni/nx
│   ├── starter - @omni/starter
│   ├── ui - @omni/ui
│   └── vscode - @omni/vs-code
└── tools
    └── scripts - @omni/scripts
```

### Applications

- `@omni/api` : API used by the Omni Studio (or any other client) to manage workspaces
- `@omni/cli` : Command Line Interface to manage local or Omni cloud workspaces
- `@omni/studio-web` : Omni Studio web application
- `@omni/studio-desktop` : Omni Studio desktop application

### Packages

- `@omni/common` : Omni's main Angular library to provide components, services, directives, pipes, etc... to applications
- `@omni/create-omni-workspace` : Omni workspace create package to enable running `npx create-omni-workspace` command
- `@omni/nx` : Nx plugin to provide efficient generators and executors to workspaces
- `@omni/starter` : Omni starter pack to quickly prototype new applications
- `@omni/ui` : Omni UI library
- `@omni/vs-code` : VS Code extension to manage Omni workspaces

### Libraries

- `@omni/api/...` : Omni API related code
- `@omni/common/...` : Omni's main Angular library
- `@omni/core/...` : core features shared between applications, libraries and packages running in a Node runtime environment to manage an Omni workspace (`@omni/api/...`, `@omni/cli`, `@omni/nx` and `@omni/vs-code`)
- `@omni/starter/...` : Omni starter pack features
- `@omni/studio/...` : Omni Studio related code
- `@omni/ui/...` : Omni UI library related code

### Tools
- `@omni/scripts` : Collection of scripts useful to contribute to Omni's repository