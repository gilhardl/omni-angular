import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readJsonFile, readProjectConfiguration } from '@nx/devkit';

import { presetGenerator } from './generator';
import { PresetGeneratorSchema } from './schema';
import { readModulePackageJson } from 'nx/src/utils/package-json';

describe('preset generator', () => {
  let tree: Tree;
  const options: PresetGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await presetGenerator(tree, options);
    const config = readProjectConfiguration(tree, options.name);
    expect(config).toBeDefined();
  });

  it('should create Nx workspace', async () => {
    await presetGenerator(tree, options);

    expect(() => {
      readJsonFile('workspace.json');
      readProjectConfiguration(tree, `@${options.name}/source`);
    }).not.toThrow();
  });

  it('should create a starter application if empty option is not set', async () => {
    await presetGenerator(tree, options);

    expect(() => {
      readProjectConfiguration(tree, options.name);
    }).not.toThrow();
  });

  it.each([undefined, false])(
    'should create a starter application if empty option is %s',
    async (empty) => {
      await presetGenerator(tree, { ...options, empty });

      expect(() => {
        readProjectConfiguration(tree, options.name);
      }).not.toThrow();
    }
  );

  it('should not create a starter application if empty option is true', async () => {
    await presetGenerator(tree, { ...options, empty: true });

    expect(() => {
      readProjectConfiguration(tree, options.name);
    }).toThrow();
  });
});
