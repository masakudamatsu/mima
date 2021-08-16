describe('Integration test with visual testing', () => {
  it('Loads the homepage', () => {
    cy.visit('/');
    cy.contains('Map Data'); // Bottom-right text to be rendered in Google Maps
    cy.percySnapshot('index', {widths: [320, 768, 1024]});
  });
});
