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

const {encryptSession} = require('../../src/utils/iron');

require('dotenv').config({path: '.env.local'}); // to read ENCRYPTION_SECRET

/**
 * @type {Cypress.PluginConfig}
 */

module.exports = (on, config) => {
  on('task', {
    // https://resultfor.dev/709934-cypress-load-environment-variables-in-custom-commands
    encryptSession: async session => {
      const token = await encryptSession(session);
      return token;
    },
  });
  // IMPORTANT to return the config object
  // with the any changed environment variables
  return config;
};
