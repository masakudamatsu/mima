import {buttonLabel, searchBoxLabel} from '../../src/utils/uiCopies';

const searchWords = 'hoxton hotel london';
const placeName = /.*hoxton, shoreditch.*/i;

describe('Search feature', () => {
  beforeEach(() => {
    cy.log('**Loading app**');
    cy.visit('/');
    cy.waitForMapToLoad();
  });
  it('happy path for mobile/mouse users', () => {
    cy.log('**Verify the absence of elements to be shown**');
    cy.findByRole('searchbox').should('not.exist');
    cy.findByRole('option', {name: placeName}).should('not.exist');
    cy.findByRole('button', {name: placeName}).should('not.exist');

    cy.log('**Clicking search icon button...**');
    cy.findByRole('button', {name: buttonLabel.search}).click();
    cy.log('**...Shows a search box**');
    cy.findByRole('searchbox').should('be.visible');
    cy.log(`**...Shows placeholder text "${searchBoxLabel.placeholder}"**`);
    cy.findByRole('searchbox').should(
      'have.attr',
      'placeholder',
      searchBoxLabel.placeholder,
    );
    cy.log('**...Autofocuses the search box**');
    cy.focused().should('have.attr', 'type', 'search');

    cy.log('**Typing a place name...**');
    cy.focused().realType(searchWords);
    cy.log('**...Shows autocomplete suggestions**');
    cy.findByRole('option', {name: placeName}).should('be.visible');
  });
  it(`allows user to close search box`, () => {
    cy.log('**Verify the absence of elements to be shown**');
    cy.findByRole('button', {name: buttonLabel.close}).should('not.exist');

    cy.log('**Clicking search icon button...**');
    cy.findByRole('button', {name: buttonLabel.search}).click();
    cy.log('**...Shows a close button**');
    cy.findByRole('button', {name: buttonLabel.close}).should('be.visible');

    cy.log('**Clicking the close button...**');
    cy.findByRole('button', {name: buttonLabel.close}).click();
    cy.log('**...Hides the search box**');
    cy.findByRole('searchbox').should('not.exist');
  });
  it('traps the focus within the search box dialog popup', () => {
    cy.log('**Setup: Open search box dialog popup**');
    cy.findByRole('button', {name: buttonLabel.search}).click();
    cy.log('**Focusing the last focusable element, and...');
    cy.findByTestId('searchbox-last-focusable-element').focus();
    cy.log('**Pressing Tab key...');
    cy.realPress('Tab');
    cy.log('**...focuses the first focusable element**');
    cy.focused().should(
      'have.attr',
      'data-testid',
      'searchbox-first-focusable-element',
    );
  });
});
