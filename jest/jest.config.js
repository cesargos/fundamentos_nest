/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('../tsconfig.json');

/**
 * IMPORTANT
 *
 * This file contains only the main config for jest
 * dot not use it as config. The ideal is use it as a
 * dependency for other configs, like jest.config.unit.js
 * and jest.config.e2e.js.
 */
module.exports = {
  rootDir: '../',
  coverageReporters: ['lcov'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  preset: 'ts-jest',
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>',
    }),
    '^src/(.*)$': '<rootDir>/$1',
  },
};
