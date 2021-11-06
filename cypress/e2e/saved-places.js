describe('Clicking a saved place', () => {
  const placeName = 'Osen';
  beforeEach(() => {
    cy.visit('/');
    cy.findByRole('button', {name: placeName}).click();
  });
  it('Shows the place name (as heading)', () => {
    cy.findByRole('heading', {name: placeName}).should('be.visible');
  });
  it('Keeps the place marker to be shown', () => {
    cy.findByRole('button', {name: placeName}).click();
    // this fails if another element covers it up
    // while should('be.visible') won't fail in that case
  });
});
