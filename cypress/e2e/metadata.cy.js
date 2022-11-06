import {index} from '../../src/utils/metadata';

describe('Metadata', () => {
  beforeEach(() => {
    cy.login();
  });
  it('index page', () => {
    cy.log(`Visiting the index page...`);
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
});
