import {buttonLabel, menuLabel} from '../../src/utils/uiCopies';
import {minPopupWidth, popupWidthShare} from '../../src/utils/designtokens';
describe('Menu feature', () => {
  beforeEach(() => {
    cy.auth();
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
  });
  it('Wide screen users can close menu by clicking outside it', () => {
    cy.log('Setup: Screen width');
    const breakpoint = minPopupWidth / popupWidthShare;
    cy.viewport(breakpoint, 800); // 800px high for MacBook 13
    cy.log('Execute: Click search icon button, and ...');
    cy.findByRole('button', {name: buttonLabel.menu}).click();
    cy.log('Execute: Click anywhere outside the menu');
    cy.get('body').click('right', {force: true});
    cy.log('Verify: Menu closes');
    cy.findByRole('dialog', {name: menuLabel}).should('not.exist');
  });
});
