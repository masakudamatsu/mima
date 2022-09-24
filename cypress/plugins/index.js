// Cypress 10 doesn't need this file.
// Currently, this file is imported in cypress.config.js
// For detail, see https://docs.cypress.io/guides/references/migration-guide#Plugins-File-Removed

/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

module.exports = (on, config) => {
  // Cypress code-coverage plugin
  require('@cypress/code-coverage/task')(on, config);
  on(
    'file:preprocessor',
    require('@cypress/code-coverage/use-browserify-istanbul'),
  );

  // IMPORTANT to return the config object
  // with the any changed environment variables
  return config;
};
