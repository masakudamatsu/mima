module.exports = {
  ...require('./jest-common'),
  displayName: 'server',
  setupFilesAfterEnv: ['<rootDir>/test/utils/prismaMock.js'],
  testEnvironment: 'node',
  testMatch: ['**/pages/api/**/*.test.js'],
};
