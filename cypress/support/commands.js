// Mock Geolocation API
// source: https://github.com/cypress-io/cypress/issues/2671#issuecomment-564796821
Cypress.Commands.add(
  'mockGetCurrentPosition',
  ({latitude, longitude, accuracy = 12}) => {
    cy.window().then($window => {
      cy.stub($window.navigator.geolocation, 'getCurrentPosition', callback => {
        return callback({coords: {latitude, longitude, accuracy}}); // https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates
      });
    });
  },
);
Cypress.Commands.add(
  'mockWatchPosition',
  ({latitude, longitude, accuracy = 12}) => {
    cy.window().then($window => {
      cy.stub($window.navigator.geolocation, 'watchPosition', callback => {
        return callback({coords: {latitude, longitude, accuracy}}); // https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates
      });
    });
  },
);

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
