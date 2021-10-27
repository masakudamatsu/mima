import {buttonLabel, menuLabel} from '../../src/utils/uiCopies';

describe('Menu button', () => {
  it('opens the menu window after being clicked', () => {
    cy.visitAtDaytime('/');
    cy.waitForMapToLoad();
    cy.findByRole('button', {name: buttonLabel.menu}).click();
    cy.findByRole('dialog', {name: menuLabel}).should('exist');
  });
});
