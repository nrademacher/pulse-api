import type { InitialOptionsTsJest } from 'ts-jest/dist/types';
import { pathsToModuleNameMapper } from 'ts-jest/utils';

const config: InitialOptionsTsJest = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(
    {
      '#internal/lib': ['./src/lib/index.ts'],
      '#internal/modules': ['./src/modules/index.ts'],
      '#internal/types': ['./src/types/index.ts'],
      '#internal/utils': ['./src/utils/index.ts'],
      '#internal/*': ['./src/*.ts'],
    },
    {
      prefix: '<rootDir>',
    },
  ),
  // globalSetup: './test/globalSetup.ts',
};

export default config;
