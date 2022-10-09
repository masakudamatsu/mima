describe('Auth feature', () => {
  it('Redirects unauth-ed users to login page', () => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.config().baseUrl}/login`);
  });
  it('Allows auth-ed users to visit the app', () => {
    cy.loginWithCookie('mockIssuer');
    cy.visit('/');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
  it('Redirects auth-ed users from login page', () => {
    cy.loginWithCookie('mockIssuer');
    cy.visit('/login');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
  it('Redirects auth-ed users from signup page', () => {
    cy.loginWithCookie('mockIssuer');
    cy.visit('/signup');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});
