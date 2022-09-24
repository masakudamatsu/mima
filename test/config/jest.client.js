// adapted from https://github.com/kentcdodds/jest-cypress-react-babel-webpack/blob/tjs/jest-19/test/jest.client.js
module.exports = {
  ...require('./jest-common'),
  displayName: 'client',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    'jest-axe/extend-expect',
    'jest-styled-components',
  ],
  testPathIgnorePatterns: ['<rootDir>/src/pages/api/'],
};
