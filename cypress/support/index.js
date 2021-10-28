// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Cypress Testing Library
import '@testing-library/cypress/add-commands';

// Cypress code-coverage plugin
import '@cypress/code-coverage/support';

// Percy for Cypress
import '@percy/cypress';

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// cypress-plugin-tab https://github.com/Bkucera/cypress-plugin-tab
require('cypress-plugin-tab');
