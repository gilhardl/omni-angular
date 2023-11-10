# @omni/nx

Omni Nx plugin.

## Building

Run `nx build nx` to build the library.

## Running unit tests

Run `nx test nx` to execute the unit tests via [Jest](https://jestjs.io).

## Testing locally

To use the `preset` Nx generator, the `@omni/nx` npm package must be built and available throught a package registry.

Indeed, a local package registry is needed to test local updates on the `preset` generator:

1. Run `nx docker:start @omni` to start docker environment
2. Run `nx run-many -t publish:local --ver <some-version-number>` to publish all Omni publishable packages to local package registry

Once finished, run `nx docker:stop @omni` to stop docker environment.
