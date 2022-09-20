module.exports = {
  ...require('./jest-common'),
  displayName: 'server',
  testEnvironment: 'node',
  testMatch: ['**/pages/api/**/*.test.js'],
};
