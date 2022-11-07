import {index, signup} from '../../src/utils/metadata';

describe('Metadata', () => {
  it('index page', () => {
    cy.log(`Visiting the index page as an authorised user...`);
    cy.auth('testuser1');
    cy.visit('/');
    cy.log(`...sets the page title`);
    cy.title().should('eq', index.title);
    cy.log(`...sets the page decription`);
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      index.description,
    );
  });
  it('signup page', () => {
    cy.log(`Visiting the signup page...`);
    cy.visit('/signup');
    cy.log(`...sets the page title`);
    cy.title().should('eq', signup.title);
    cy.log(`...sets the page decription`);
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      signup.description,
    );
  });
});
