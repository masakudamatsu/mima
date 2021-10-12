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
  beforeEach(() => {
    cy.clock(Date.UTC(2021, 8, 28, 6), ['Date']); // https://docs.cypress.io/api/commands/clock#Function-names
    cy.visit('/');
    cy.contains('Map Data', {timeout: 20000}); // Bottom-right text to be rendered in Google Maps
    cy.mockGeolocation(); // this needs to be run after cy.visit(). Source: https://github.com/cypress-io/cypress/issues/2671#issuecomment-780721234

    // execute
    cy.findByRole('button', {name: 'Show current location'}).click();

    // wait for GPS info loaded
    cy.findByRole('button', {
      name: 'Stop tracking current location',
      timeout: 50000,
    });
  });
  it('Shows the current location with the blur circle', () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2500); // we cannot detect when Google Maps are fully loaded
    cy.percySnapshot('current-location', {widths: [320, 768, 1024]});
  });
});
