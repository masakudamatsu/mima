const path = require('path');

module.exports = {
  clearMocks: true, // run jest.clearAllMocks() after each test
  coverageDirectory: 'coverage-jest', // to avoid clashing with Cypress coverage report (https://github.com/bahmutov/cypress-and-jest#jest-init)
  moduleDirectories: [
    'node_modules',
    __dirname,
    path.join(__dirname, '../src'), // allow imports with absolute paths
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    'jest-axe/extend-expect',
    'jest-styled-components',
  ],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '<rootDir>/cypress/',
    '<rootDir>/node_modules/',
    '<rootDir>/templates/',
  ],
};
