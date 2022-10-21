// Cypress 10 requires this file to be called `e2e.js`.
// For detail, see https://docs.cypress.io/guides/references/migration-guide#supportFile

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

// Percy for Cypress
import '@percy/cypress';

// cypress-real-events https://github.com/dmtrKovalenko/cypress-real-events
import 'cypress-real-events/support';

// Import commands.js using ES2015 syntax:
import './commands';
// Alternatively you can use CommonJS syntax:
// require('./commands')
