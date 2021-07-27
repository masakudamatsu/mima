import {index} from '../../src/utils/metadata';

describe('Index page', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('shows the page title in the browser tab', () => {
    cy.title().should('eq', index.title);
  });
  it('lets search enginges see the description', () => {
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      index.description,
    );
  });
});
