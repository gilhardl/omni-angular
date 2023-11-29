# Omni repository organization

Omni is a collection of tools to speed-up the full-stack applications development for Angular developpers :
- Omni Studio
- Omni CLI
- VS Code extension
- Nx Plugin
- Angular libraries

Omni source code repository is organized as following :

```
┌── apps
│   ├── api
│   │   ├── local - @omni/api-local
│   │   └── cloud - @omni/api-cloud
│   ├── cli - @omni/cli
│   └── studio
│       ├── web - @omni/studio-web
│       └── desktop - @omni/studio-desktop
├── libs
│   ├── api
│   │   └── core - @omni/api/core
│   ├── core
│   │   ├── config - @omni/core/config
│   │   ├── database - @omni/core/database
│   │   ├── filesystem - @omni/core/filesystem
│   │   ├── workspaces - @omni/core/workspaces
│   │   └── nx - @omni/core/nx
│   └── studio
│       ├── core - @omni/studio/core
│       └── api-client - @omni/studio/api-client
├── packages
│   ├── angular
│   │   ├── core - @omni/core
│   │   └── ui - @omni/ui
│   ├── create-omni-workspace - @omni/create-omni-workspace
│   ├── nx - @omni/nx
│   └── vscode - @omni/vs-code
└── tools
    └── scripts - @omni/scripts
```

**Applications**

- `@omni/api-local` : API used by the Omni Studio (or any other client) to manage local workspaces
- `@omni/api-cloud` : API used by the Omni Studio (or any other client) to manage Omni cloud workspaces
- `@omni/cli` : Command Line Interface to manage local or Omni cloud workspaces
- `@omni/studio-web` : Omni Studio web application
- `@omni/studio-desktop` : Omni Studio desktop application

**Libraries**

- `@omni/api/...` : features shared between APIs (`@omni/api-local` and `@omni/api-cloud`)
- `@omni/core/...` : core features shared between applications, libraries and packages running in a Node runtime environment to manage an Omni workspace (`@omni/api/core`, `@omni/cli`, `@omni/nx` and `@omni/vs-code`)
- `@omni/studio/...` : features shared between Omni Studio platform-specific apps

**Packages**
- `@omni/core` : core Omni library to use in Angular apps made with Omni
- `@omni/ui` : Omni base UI library
- `@omni/nx` : Nx plugin to provide Omni specific generators and executors to workspaces
- `@omni/vs-code` : VS Code extension to manage Omni workspaces

**Tools**

- `@omni/scripts` : Collection of scripts useful to contribute to Omni's repository