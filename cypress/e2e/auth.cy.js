import {loginPage, signupPage} from '../../src/utils/uiCopies';

describe('First-time users', () => {
  it('can start a trial by visiting the Signup page', () => {
    cy.visit('/signup');
    cy.findByText(signupPage.buttonLabel).then(link => {
      cy.wrap(link).should('have.attr', 'href', '/api/auth/signup');
      cy.request(link.prop('href')).its('status').should('eq', 200);
    });
  });
});
describe('Logged-out users', () => {
  it('can log in by visiting the Signup page', () => {
    cy.visit('/signup');
    cy.findByText(loginPage.buttonLabel).then(link => {
      cy.wrap(link).should('have.attr', 'href', '/api/auth/login');
      cy.request(link.prop('href')).its('status').should('eq', 200);
    });
  });
});

describe('Trial users', () => {
  beforeEach(() => {
    cy.auth('trial_user', {
      username: Cypress.env('auth0UserTrial'),
      password: Cypress.env('auth0PassTrial'),
    });
  });
  it('can directly visit the app once logged in', () => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});

describe('Expired trial users', () => {
  beforeEach(() => {
    cy.auth('trial_expired_user', {
      username: Cypress.env('auth0UserTrialExpired'),
      password: Cypress.env('auth0PassTrialExpired'),
    });
  });
  it('gets redirected from the app to subscribe page', () => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.config().baseUrl}/subscribe`);
  });
});

describe('Authorised users', () => {
  beforeEach(() => {
    cy.auth();
  });
  it('get redirected from login page to the app', () => {
    cy.visit('/login');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
  it('will not get redirected from signup page to the app', () => {
    cy.visit('/signup');
    cy.url().should('eq', `${Cypress.config().baseUrl}/signup`);
  });
});
