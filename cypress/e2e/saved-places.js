describe('Clicking a saved place', () => {
  const placeName = 'Osen';
  beforeEach(() => {
    cy.visit('/');
    cy.findByRole('button', {name: placeName}).click();
  });
  it('Shows the place name (as heading)', () => {
    cy.findByRole('heading', {name: placeName}).should('be.visible');
  });
});
