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

describe('Current location', () => {
  beforeEach(() => {
    cy.clock(Date.UTC(2021, 8, 28, 6), ['Date']); // https://docs.cypress.io/api/commands/clock#Function-names
    cy.visit('/');
    cy.contains('Map Data', {timeout: 20000}); // Bottom-right text to be rendered in Google Maps
    cy.mockGeolocation();
  });
  it('Shown after tapping the locator button', () => {
    cy.findByRole('button', {name: 'Show current location'}).click();
    cy.contains('Map Data', {timeout: 20000}); // Bottom-right text to be rendered in Google Maps
    cy.percySnapshot('current-location', {widths: [320, 768, 1024]});
  });
});
