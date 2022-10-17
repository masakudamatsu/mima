import {buttonLabel} from '../../src/utils/uiCopies';
import {getToken} from '../../test/utils/generate';

const mockUserId = getToken();
const {
  mockUser1,
  mockUser2,
  mockPlace1,
  mockPlace2,
  mockPlace3,
  mockPlace4,
  mockPlace5,
  mockPlace6,
  mockPlace7,
} = require('../../test/utils/mockUsers');

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
    cy.log(`Setting up`);
    cy.loginWithCookie({userId: mockUserId});
    cy.visit('/');
    cy.log(`Clicking the logout button...`);
    cy.findByRole('button', {name: buttonLabel.menu}).click();
    cy.findByRole('button', {name: buttonLabel.logout}).click();
    cy.log('...redirects to login page');
    cy.url().should('eq', `${Cypress.config().baseUrl}/login`);
  });
  it('Shows only those places saved by the logged-in user', () => {
    cy.log('Resetting the database');
    cy.exec('npx prisma migrate reset --force'); // https://docs.cypress.io/guides/end-to-end-testing/testing-your-app#Seeding-data

    cy.log(`Mock user #1`);
    cy.loginWithCookie({userId: mockUser1.userId});
    cy.visit('/');
    cy.waitForMapToLoad();
    cy.findByRole('button', {name: mockPlace3.properties.name}).should(
      'not.exist',
    );
    cy.findByRole('button', {name: mockPlace5.properties.name}).should(
      'not.exist',
    );

    cy.log(`Mock user #2`);
    cy.loginWithCookie({userId: mockUser2.userId});
    cy.visit('/');
    cy.waitForMapToLoad();
    cy.findByRole('button', {name: mockPlace1.properties.name}).should(
      'not.exist',
    );
    cy.findByRole('button', {name: mockPlace2.properties.name}).should(
      'not.exist',
    );
    cy.findByRole('button', {name: mockPlace4.properties.name}).should(
      'not.exist',
    );
    cy.findByRole('button', {name: mockPlace6.properties.name}).should(
      'not.exist',
    );
    cy.findByRole('button', {name: mockPlace7.properties.name}).should(
      'not.exist',
    );
  });
});
