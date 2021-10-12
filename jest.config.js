"use strict";
exports.__esModule = true;
var config = {
    clearMocks: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/singleton.ts']
};
exports["default"] = config;
