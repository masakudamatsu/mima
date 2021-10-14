import {locatorButtonLabel} from '../../src/utils/uiCopies';

describe('Initial UI', () => {
  it('Rendered in Light Mode at Daytime', () => {
    cy.clock(Date.UTC(2021, 8, 28, 6), ['Date']); // https://docs.cypress.io/api/commands/clock#Function-names
    cy.visit('/');
    cy.contains('Map Data', {timeout: 20000}); // Bottom-right text to be rendered in Google Maps
    cy.percySnapshot('initial-ui-daytime', {widths: [320, 768, 1024]});
  });
  it('Rendered in Dark Mode at Nighttime', () => {
    cy.clock(Date.UTC(2021, 8, 28, 18), ['Date']); // https://docs.cypress.io/api/commands/clock#Function-names
    cy.visit('/');
    cy.contains('Map Data', {timeout: 20000}); // Bottom-right text to be rendered in Google Maps
    cy.percySnapshot('initial-ui-nighttime', {widths: [320, 768, 1024]});
  });
});

describe('After clicking the location button', () => {
  const initialLat = 35.011565;
  const initialLng = 135.768326;
  const oneMeterInDegree = 1 / 111000; // 1 degree = 111km https://www.usna.edu/Users/oceano/pguth/md_help/html/approx_equivalents.htm
  beforeEach(() => {
    cy.clock(Date.UTC(2021, 8, 28, 6), ['Date']); // https://docs.cypress.io/api/commands/clock#Function-names
    cy.visit('/');
    cy.contains('Map Data', {timeout: 20000}); // Bottom-right text to be rendered in Google Maps
  });
  it('Shows current location with flight icon heading south and 15m accuracy circle', () => {
    // setup (mock current locations)
    cy.mockGetCurrentPosition({
      latitude: initialLat,
      longitude: initialLng,
    }); // this needs to be run after cy.visit(). Source: https://github.com/cypress-io/cypress/issues/2671#issuecomment-780721234
    cy.mockWatchPosition({
      latitude: initialLat - oneMeterInDegree, // moving southwards
      longitude: initialLng,
      accuracy: 15,
    }); // this needs to be run after cy.visit(). Source: https://github.com/cypress-io/cypress/issues/2671#issuecomment-780721234
    // execute
    cy.findByRole('button', {name: locatorButtonLabel.default}).click();
    //verify
    cy.findByRole('button', {
      name: locatorButtonLabel.activated,
      timeout: 50000,
    });
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2500); // we cannot detect when Google Maps are fully loaded
    cy.percySnapshot('current-location-heading-south-more-accurate', {
      widths: [320, 768, 1024],
    });
  });
  it('Shows current location with flight icon heading west and 30m accuracy circle', () => {
    // setup (mock current locations)
    cy.mockGetCurrentPosition({latitude: initialLat, longitude: initialLng}); // this needs to be run after cy.visit(). Source: https://github.com/cypress-io/cypress/issues/2671#issuecomment-780721234
    cy.mockWatchPosition({
      latitude: initialLat,
      longitude: initialLng - oneMeterInDegree, // moving westward
      accuracy: 30,
    }); // this needs to be run after cy.visit(). Source: https://github.com/cypress-io/cypress/issues/2671#issuecomment-780721234
    // execute
    cy.findByRole('button', {name: locatorButtonLabel.default}).click();
    //verify
    cy.findByRole('button', {
      name: locatorButtonLabel.activated,
      timeout: 50000,
    });
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2500); // we cannot detect when Google Maps are fully loaded
    cy.percySnapshot('current-location-heading-west-less-accurate', {
      widths: [320, 768, 1024],
    });
  });
});
