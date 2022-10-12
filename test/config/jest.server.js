module.exports = {
  ...require('./jest-common'),
  displayName: 'server',
  setupFiles: ['<rootDir>/test/config/setEnvVars.js'],
  setupFilesAfterEnv: ['<rootDir>/test/utils/prismaMock.js'],
  testEnvironment: 'node',
  testMatch: ['**/pages/api/**/*.test.js'],
};
