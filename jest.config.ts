import type { InitialOptionsTsJest } from 'ts-jest/dist/types';
import { pathsToModuleNameMapper } from 'ts-jest/utils';

const config: InitialOptionsTsJest = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(
    { '#internal/*': ['./src/*'] },
    {
      prefix: '<rootDir>',
    },
  ),
  // setupFilesAfterEnv: ['./test/singleton.ts'],
};

export default config;
