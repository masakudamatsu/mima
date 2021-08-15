describe('Integration test with visual testing', () => {
  it('Loads the homepage', () => {
    cy.visit('/');
    cy.percySnapshot('index', {widths: [320, 768, 1024]});
  });
});
