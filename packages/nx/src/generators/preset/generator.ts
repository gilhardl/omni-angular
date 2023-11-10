import {
  addDependenciesToPackageJson,
  formatFiles,
  readJson,
  Tree,
  writeJson,
} from '@nx/devkit';

import { NPM_PACKAGE_NAME } from '../../lib/constants';
import { PresetGeneratorSchema } from './schema';

export async function presetGenerator(
  tree: Tree,
  options: PresetGeneratorSchema
) {
  const workspaceConfig = readJson(tree, 'nx.json');
  const packageConfig = readJson(tree, 'package.json');

  writeJson(tree, 'nx.json', {
    $schema: workspaceConfig.$schema,
    workspaceLayout: {
      appsDir: 'apps',
      libsDir: 'libs',
    },
    targetDefaults: workspaceConfig.targetDefaults,
    namedInputs: workspaceConfig.namedInputs,
    ...workspaceConfig,
    plugins: [NPM_PACKAGE_NAME],
  });

  const nxVersion = packageConfig.devDependencies['nx'] || 'latest';

  const installDependencies = addDependenciesToPackageJson(
    tree,
    {},
    {
      '@nx/angular': nxVersion,
    }
  );
  await formatFiles(tree);

  await installDependencies();
}

export default presetGenerator;
