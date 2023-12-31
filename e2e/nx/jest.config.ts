/* eslint-disable */
export default {
  displayName: '@omni/nx-e2e',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/e2e/nx',
  globalSetup: './scripts/start-local-registry.ts',
  globalTeardown: './scripts/stop-local-registry.ts',
};
