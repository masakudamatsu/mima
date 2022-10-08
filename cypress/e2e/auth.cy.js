describe('Auth feature', () => {
  it('Redirects unauth-ed users to login page', () => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.config().baseUrl}/login`);
  });
  // TODO #268: figure out how to obtain/mock a session cookie with Cypress
  it.skip('Allows auth-ed users to visit the app', () => {});
});
