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
    cy.focused().should('have.attr', 'data-testid', 'close-button');
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
  it('traps focus inside with Tab key', () => {
    cy.findByTestId('last-focusable-element').tab({shift: false});
    cy.focused().should('have.attr', 'data-testid', 'close-button');
  });
  it('traps focus inside with Shift + Tab key', () => {
    cy.findByTestId('close-button').tab({shift: true});
    cy.focused().should('have.attr', 'data-testid', 'last-focusable-element');
  });
});

describe('Menu window, once closed...', () => {
  beforeEach(() => {
    cy.visitAtDaytime('/');
    cy.waitForMapToLoad();
    cy.findByRole('button', {name: buttonLabel.menu}).click();
    cy.findByRole('button', {name: buttonLabel.close}).click();
  });
  it('focuses the menu button', () => {
    cy.focused().should('have.attr', 'data-testid', 'menu-button');
  });
});
