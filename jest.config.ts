import type { InitialOptionsTsJest } from 'ts-jest/dist/types';
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

const config: InitialOptionsTsJest = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),

  // setupFilesAfterEnv: ['./test/singleton.ts'],
};

export default config;
