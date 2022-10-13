import {buttonLabel} from '../../src/utils/uiCopies';
import {getToken} from '../../test/utils/generate';

const mockUserId = getToken();
describe('Auth feature', () => {
  it('Redirects unauth-ed users to login page', () => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.config().baseUrl}/login`);
  });
  it('Allows auth-ed users to visit the app', () => {
    cy.loginWithCookie({userId: mockUserId});
    cy.visit('/');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
  it('Redirects auth-ed users from login page', () => {
    cy.loginWithCookie({userId: mockUserId});
    cy.visit('/login');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
  it('Redirects auth-ed users from signup page', () => {
    cy.loginWithCookie({userId: mockUserId});
    cy.visit('/signup');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
  it('Logs users out after they click logout button in the menu', () => {
    cy.log(`**Setting up**`);
    cy.loginWithCookie({userId: mockUserId});
    cy.visit('/');
    cy.log(`**Clicking the logout button...`);
    cy.findByRole('button', {name: buttonLabel.menu}).click();
    cy.findByRole('button', {name: buttonLabel.logout}).click();
    cy.log('**...redirects to login page**');
    cy.url().should('eq', `${Cypress.config().baseUrl}/login`);
  });
});
