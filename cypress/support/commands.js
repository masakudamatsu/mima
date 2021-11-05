import {userLocationMakerLabel} from '../../src/utils/uiCopies';

// Swipe from right to left
Cypress.Commands.add('swipeScreenRightToLeft', () => {
  const screenWidth = Cypress.config('viewportWidth');
  const screenHeight = Cypress.config('viewportHeight');
  cy.get('body')
    .trigger('mousedown', {button: 0})
    .trigger('mousemove', {
      clientX: screenWidth - 100,
      clientY: screenHeight / 2,
    })
    .trigger('mousemove', {clientX: 100, clientY: screenHeight / 2})
    .trigger('mouseup');
});

// Visit the app
Cypress.Commands.add('visitAtDaytime', url => {
  cy.clock(Date.UTC(2021, 8, 28, 6), ['Date']); // https://docs.cypress.io/api/commands/clock#Function-names
  cy.visit(url);
});
Cypress.Commands.add('visitAtNight', url => {
  cy.clock(Date.UTC(2021, 8, 28, 18), ['Date']); // https://docs.cypress.io/api/commands/clock#Function-names
  cy.visit(url);
});

// Wait for maps to be loaded
Cypress.Commands.add('waitForMapToLoad', () => {
  cy.contains('Map Data', {timeout: 20000}); // Bottom-right text to be rendered in Google Maps
});

// Mock Geolocation API
// should be run after cy.visit('/')
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

// Wait for user location to be marked on the map
Cypress.Commands.add('waitForUserLocationToBeMarked', () => {
  // make sure user location is marked on the map
  cy.findByRole('img', {name: userLocationMakerLabel, timeout: 50000});
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(2500); // we cannot detect when Google Maps are fully loaded
});

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
