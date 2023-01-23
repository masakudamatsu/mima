// This file contains tests that pass manually but fail with Cypress
import {buttonLabel} from 'src/utils/uiCopies';
describe(`search.cy.js`, () => {
  beforeEach(() => {
    cy.log('Loading app');
    cy.auth();
    cy.visit('/');
    cy.waitForMapToLoad();
  });
  // TODO #412 : make the following test pass
  it.skip(`closes searchbox after pressing ESC key`, () => {
    cy.log('Clicking search icon button and...');
    cy.findByRole('button', {name: buttonLabel.search}).click();
    cy.log('Pressing Esc key...');
    cy.get('body').type('{esc}');
    cy.log('...Hides the search box');
    cy.findByRole('combobox').should('not.exist');
    cy.log('...Focuses the search icon button');
    cy.focused().should('have.attr', 'aria-label', buttonLabel.search);
  });
});
