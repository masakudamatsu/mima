import {buttonLabel, menuLabel} from '../../src/utils/uiCopies';
describe('Menu feature', () => {
  beforeEach(() => {
    cy.visitAtDaytime('/');
    cy.waitForMapToLoad();
  });
  it('Happy path', () => {
    cy.log(`Clicking menu button...`);
    cy.findByRole('button', {name: buttonLabel.menu}).click();

    cy.log(`...opens the menu window`);
    cy.findByRole('dialog', {name: menuLabel}).should('exist');
    cy.log(`...focuses the close button`);
    cy.focused().should('have.attr', 'data-testid', 'close-button-menu');

    cy.log(`...traps focus inside with Tab key`);
    cy.findByTestId('last-focusable-element').focus();
    cy.realPress('Tab');
    cy.focused().should('have.attr', 'data-testid', 'close-button-menu');

    cy.log(`...traps focus inside with Shift + Tab key`);
    cy.findByTestId('close-button-menu').focus();
    cy.realPress(['Shift', 'Tab']);
    cy.focused().should('have.attr', 'data-testid', 'last-focusable-element');

    cy.log(`Clicking the close button...`);
    cy.findByRole('button', {name: buttonLabel.close}).click();
    cy.log(`...closes the menu`);
    cy.findByRole('dialog', {name: menuLabel}).should('not.exist');
    cy.log(`...focuses the menu button`);
    cy.focused().should('have.attr', 'data-testid', 'menu-button');

    cy.log(`Pressing ESC key also closes the menu`);
    // setup
    cy.findByRole('button', {name: buttonLabel.menu}).click();
    // execute
    cy.get('body').type('{esc}');
    // verify
    cy.findByRole('dialog', {name: menuLabel}).should('not.exist');
  });
});
