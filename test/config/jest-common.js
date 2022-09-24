// adapted from https://github.com/kentcdodds/jest-cypress-react-babel-webpack/blob/tjs/jest-19/test/jest-common.js

const path = require('path');

module.exports = {
  clearMocks: true, // run jest.clearAllMocks() after each test
  moduleDirectories: [
    'node_modules',
    path.join(__dirname, '../../'), // allow imports with absolute paths
  ],
  rootDir: path.join(__dirname, '../..'), // https://jestjs.io/docs/configuration#rootdir-string
  testPathIgnorePatterns: [
    '<rootDir>/cypress/',
    '<rootDir>/node_modules/',
    '<rootDir>/templates/',
  ],
};
