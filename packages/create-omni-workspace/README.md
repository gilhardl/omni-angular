# create-omni-workspace

Omni install package. This is used to create new Omni workspaces by running any of the following commands:

- `npx create-omni-workspace`
- `yarn create omni-workspace`
- `npm init omni-workspace`
- `pnpm init omni-workspace`

## Building

Run `nx build create-omni-workspace` to build the library.

## Running unit tests

Run `nx test create-omni-workspace` to execute the unit tests via [Jest](https://jestjs.io).

## Testing locally

1. Run `nx docker:start @omni` to start docker environment
2. Run `nx run-many -t publish:local --ver <some-version-number>` to publish all Omni publishable packages to local package registry

Once finished, run `nx docker:stop @omni` to stop docker environment
