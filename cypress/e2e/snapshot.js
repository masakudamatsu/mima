describe('Initial UI', () => {
  it('Rendered in Light Mode at Daytime', () => {
    cy.clock(Date.UTC(2021, 8, 28, 6), ['Date']); // https://docs.cypress.io/api/commands/clock#Function-names
    cy.visit('/');
    cy.contains('Map Data'); // Bottom-right text to be rendered in Google Maps
    cy.percySnapshot('initial-ui-daytime', {widths: [320, 768, 1024]});
  });
  it('Rendered in Dark Mode at Nighttime', () => {
    cy.clock(Date.UTC(2021, 8, 28, 18), ['Date']); // https://docs.cypress.io/api/commands/clock#Function-names
    cy.visit('/');
    cy.contains('Map Data'); // Bottom-right text to be rendered in Google Maps
    cy.percySnapshot('initial-ui-nighttime', {widths: [320, 768, 1024]});
  });
});
