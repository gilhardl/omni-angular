# Omni workspace architecture

Omni follow the Domain-Driven Development approach.

The workspace is organized in projects, each one of them is associated to a type and a layer in the workspace organization.

## Project types

- **Applications** : Located under the `apps` folder, they could either be an Angular application, a Supabase project's serverless functions, an Electron application or even a Command Line Interface...
- **Libraries** : Located under the `libs` folder, they are simple libraries.
- **Packages** : Located under the `packages` folder, they are publishable libraries.
- **E2E** : Located under the `e2e` folder, they are end to end testing applications.
- **Tools** : Located under the `tools` folder, they are workspace specific utility libraries.

## Layers

- **Public** : Exposes a functional domain's libraries to other functional domains. There can be only one public library by functional domain, only containing barrel `index.ts` files exporting what should be exposed to other functional domains.

- **Shell** : Provide routing between smart components from a functional domain's feature libraries. There can be only one shell library by functional domain or none if there is a single feature library.

- **Feature** : Feature layer contains the smart components of a functional domain which is usually the pages and modals that are loaded by the router or (opened for modals).

- **UI** : UI layer contains use-case agnostic components and directives that are relevant to the functional domain. Often time, these components and directives can be useful to the whole app so they will end up in shared domain.

- **Domain** : Domain layer contains a functional domain's business logic and models, facade services, state management, and network communication.

- **Util** : Util layer contains use-case agnostic helpers (eg. a date formatter) that are relevant to the functional domain. Often time, these utils are not tied to any specific functional domain so they will end up in shared domain.

> Libraries must be named with the layer as suffix : **{library-name}-{layer}**
>
> If the libray name is the same as the functional domain, it can be ommited

### Shared libraries

In addition to folders for each application's functional domain, the workspace's `libs` folder contains a `shared` folder which contains libraries that are not relevant to any specific functional domains.

## Module boundaries

### Between domains

- Applications can depend on **shell** and **feature** libraries

- **Shared** libraries can't depend on libraries of any other functional domain

- **Functional domains** libraries can only depend on **public** libraries of other functional domains

### Between layers

- **Public** library can depend on any other layer of its functional domain.

- **Shell** libraries can depend on **feature** libraries of its functional domain.

- **Feature** libraries can depend on **ui**, **domain** and **util** libraries of its functional domain. Can depend **public** libraries of other functional domains.

- **UI** libraries can depend on **domain** and **util** libraries of its functional domain.

- **Domain** libraries can depend on **util** libraries of its functional domain. Can depend **public** libraries of other functional domains.

- **Util** libraries can't depend on other layer libraries.

## Workspace layout

```
apps
  public-app
    app/...
    project.json
    README.md
  admin-app/...
libs/...
  auth/
    domain-auth/...
    feature-auth/...
    public-auth/...
    shell-auth/...
    ui-auth/...
    util-auth/...
  domain-x/...
  i18n/
    domain-i18n/...
    public-i18n/...
    ui-i18n/...
    util-i18n/...
  preferences/
    domain/...
    feature-preferences/...
    public-preferences/...
    ui-preferences/...
    util-preferences/...
  router/
    domain-router/...
    public-router/...
    util-router/...
  shared/
  theme/
    domain-theme/...
    public-theme/...
    ui-theme/...
    util-theme/...
nx.json
package.json
README.md
```
