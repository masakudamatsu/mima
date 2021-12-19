import {buttonLabel} from '../../src/utils/uiCopies';

describe('Clicking search button', () => {
  beforeEach(() => {
    cy.visitAtDaytime('/');
    cy.waitForMapToLoad();
    cy.findByRole('button', {name: buttonLabel.search}).click();
  });
  it(`disables the search button`, () => {
    cy.findByRole('button', {name: buttonLabel.search}).should('not.exist');
  });
  it(`shows close button to get back to map view`, () => {
    cy.findByRole('button', {name: buttonLabel.close}).click();
    cy.findByRole('button', {name: buttonLabel.search}).should('exist');
  });
  it('focuses the search box', () => {
    cy.focused().should('have.attr', 'data-testid', 'search-box');
  });
  it.skip('traps focus within the search window', () => {
    // use cypress-real-events plugin https://github.com/dmtrKovalenko/cypress-real-events
  });
});
