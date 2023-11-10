import { Tree, names } from '@nx/devkit';
import { Linter } from '@nx/eslint';
import {
  E2eTestRunner,
  UnitTestRunner,
} from '@nx/angular/src/utils/test-runners';
import { applicationGenerator as angularGenerator } from '@nx/angular/src/generators/application/application';

import { ApplicationGeneratorSchema } from './schema';

export async function applicationGenerator(
  tree: Tree,
  options: ApplicationGeneratorSchema
) {
  const normalizedOptions = {
    name: names(options.name).fileName,
  };

  return angularGenerator(tree, {
    name: normalizedOptions.name,
    projectNameAndRootFormat: 'as-provided',
    directory: `apps/${normalizedOptions.name}`,
    prefix: normalizedOptions.name,
    strict: true,
    standalone: true,
    minimal: true,
    routing: true,
    addTailwind: true,
    style: 'scss',
    linter: Linter.EsLint,
    unitTestRunner: UnitTestRunner.Jest,
    e2eTestRunner: E2eTestRunner.Cypress,
    backendProject: undefined,
    tags: `type:app,scope:${normalizedOptions.name}`,
  });
}

export default applicationGenerator;
