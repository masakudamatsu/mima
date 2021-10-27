import {buttonLabel, menuLabel} from '../../src/utils/uiCopies';

describe('Clicking menu button', () => {
  beforeEach(() => {
    cy.visitAtDaytime('/');
    cy.waitForMapToLoad();
    cy.findByRole('button', {name: buttonLabel.menu}).click();
  });
  it('opens the menu window', () => {
    cy.findByRole('dialog', {name: menuLabel}).should('exist');
  });
  it('focuses the close button', () => {
    cy.focused().click();
    cy.findByRole('dialog', {name: menuLabel}).should('not.exist');
  });
});

describe('Menu window, once opened...', () => {
  beforeEach(() => {
    cy.visitAtDaytime('/');
    cy.waitForMapToLoad();
    cy.findByRole('button', {name: buttonLabel.menu}).click();
  });
  it('closes after clicking the close button', () => {
    cy.findByRole('button', {name: buttonLabel.close}).click();
    cy.findByRole('dialog', {name: menuLabel}).should('not.exist');
  });
  it('closes after pressing Esc key', () => {
    cy.get('body').type('{esc}');
    cy.findByRole('dialog', {name: menuLabel}).should('not.exist');
  });
});
