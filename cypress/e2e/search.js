import {buttonLabel, searchBoxLabel} from '../../src/utils/uiCopies';

describe('Clicking search button', () => {
  beforeEach(() => {
    cy.visitAtDaytime('/');
    cy.waitForMapToLoad();
    cy.findByRole('button', {name: buttonLabel.search}).click();
  });
  it(`shows close button to get back to map view`, () => {
    cy.findByRole('button', {name: buttonLabel.close}).click();
    cy.findByRole('button', {name: buttonLabel.close}).should('not.exist');
  });
  it('focuses the search box', () => {
    cy.focused().should(
      'have.attr',
      'data-testid',
      'searchbox-first-focusable-element',
    );
  });
  it(`shows "${searchBoxLabel.placeholder}" as search box's placeholder text`, () => {
    cy.findByLabelText(searchBoxLabel.ariaLabel).should(
      'have.attr',
      'placeholder',
      searchBoxLabel.placeholder,
    );
  });
});

describe(`Once the search box is shown`, () => {
  beforeEach(() => {
    cy.visitAtDaytime('/');
    cy.waitForMapToLoad();
    cy.findByRole('button', {name: buttonLabel.search}).click();
  });
  it('Pressing close button focuses the search button', () => {
    cy.findByRole('button', {name: buttonLabel.close}).click();
    cy.focused().should('have.attr', 'data-testid', 'search-button');
  });
  it('traps focus within the search window with Tab key', () => {
    cy.findByTestId('searchbox-last-focusable-element').focus();
    cy.realPress('Tab');
    cy.focused().should(
      'have.attr',
      'data-testid',
      'searchbox-first-focusable-element',
    );
  });
  it('traps focus within the search window with Shift + Tab key', () => {
    cy.findByTestId('searchbox-first-focusable-element').focus();
    cy.realPress(['Shift', 'Tab']);
    cy.focused().should(
      'have.attr',
      'data-testid',
      'searchbox-last-focusable-element',
    );
  });
});
