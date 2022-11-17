const {defineConfig} = require('cypress');

module.exports = defineConfig({
  port: 3001,
  video: false,
  viewportHeight: 1100,
  viewportWidth: 1100,
  e2e: {
    // https://docs.cypress.io/guides/references/configuration#e2e
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    // For detail, see https://docs.cypress.io/guides/references/migration-guide#Config-Option-Changes
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
    baseUrl: 'http://localhost:3000',
    experimentalSessionAndOrigin: true, // to use cy.session(): https://docs.cypress.io/api/commands/session
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});
