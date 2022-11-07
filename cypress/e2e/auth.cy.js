import {loginPage, signupPage} from '../../src/utils/uiCopies';

describe('Sign up', () => {
  it('Signup page has a link to Auth0 signup form', () => {
    cy.visit('/signup');
    cy.findByText(signupPage.buttonLabel).then(link => {
      cy.wrap(link).should('have.attr', 'href', '/api/auth/signup');
      cy.request(link.prop('href')).its('status').should('eq', 200);
    });
  });
});

describe('Log in', () => {
  it('Users can log in via the Signup page', () => {
    cy.visit('/signup');
    cy.findByText(loginPage.buttonLabel).then(link => {
      cy.wrap(link).should('have.attr', 'href', '/api/auth/login');
      cy.request(link.prop('href')).its('status').should('eq', 200);
    });
  });
});

describe('Authorised users', () => {
  beforeEach(() => {
    cy.auth('testuser1');
  });
  it('get redirected from login page to the app', () => {
    cy.visit('/login');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});
