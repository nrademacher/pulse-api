"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("ts-jest/utils");
var config = {
    clearMocks: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: (0, utils_1.pathsToModuleNameMapper)({ '#internal/*': ['./src/*'] }, {
        prefix: '<rootDir>',
    }),
    // setupFilesAfterEnv: ['./test/singleton.ts'],
};
exports.default = config;
