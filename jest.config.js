// adapted from https://github.com/kentcdodds/jest-cypress-react-babel-webpack/blob/tjs/jest-19/jest.config.js
module.exports = {
  ...require('./test/config/jest-common'),
  coverageDirectory: 'coverage-jest', // to avoid clashing with Cypress coverage report (https://github.com/bahmutov/cypress-and-jest#jest-init)
  projects: ['./test/config/jest.client.js', './test/config/jest.server.js'],
};
