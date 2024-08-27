/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  globals: { 'ts-jest': { diagnostics: false } },
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  testTimeout: 20000
};