import {buttonLabel, searchBoxLabel} from '../../src/utils/uiCopies';
import {autocomplete} from '../../src/utils/designtokens';
import {boldText} from '../../src/utils/designtokens';
const searchWords = [/nijo/i, /koya/i];
const placeName = /.*nijo.*koya.*/i;
const placeAddress = '382-3 Mogamichō, Nakagyo Ward, Kyoto, 604-8303, Japan';
describe('Search feature', () => {
  beforeEach(() => {
    cy.log('**Loading app**');
    cy.visit('/');
    cy.waitForMapToLoad();
  });
  it('happy path for mobile/mouse users', () => {
    cy.log('**Verify the absence of elements to be shown**');
    cy.findByRole('combobox').should('not.exist');
    cy.findByRole('option', {name: placeName.regex}).should('not.exist');
    cy.findByRole('button', {name: placeName.japanese}).should('not.exist');

    cy.log('**Clicking search icon button...**');
    cy.findByRole('button', {name: buttonLabel.search}).click();
    cy.log('**...Shows a search box**');
    cy.findByRole('combobox').should('be.visible');
    cy.log(`**...Shows placeholder text "${searchBoxLabel.placeholder}"**`);
    cy.findByRole('combobox').should(
      'have.attr',
      'placeholder',
      searchBoxLabel.placeholder,
    );
    cy.log('**...Autofocuses the search box**');
    cy.focused().should('have.attr', 'type', 'search');

    cy.log('**Typing a place name...**');
    cy.focused().realType(searchWords[0].source);
    cy.log(
      '**...Highlights entered text in bold in autocomplete suggestions**',
    );
    cy.findAllByText(searchWords[0]).should(
      'have.css',
      'font-weight',
      boldText.fontWeight.toString(),
    );

    cy.log('**Typing more...**');
    cy.focused().realPress('Space').realType(searchWords[1].source);
    cy.log('**Selecting one of the autocomplete suggestions**');
    cy.findByRole('option', {name: placeName}).click();
    cy.log('**...Shows the place on the map**');
    cy.findByRole('button', {name: placeName}).should('be.visible');
    cy.log('**...Shows the place info**');
    cy.findByRole('heading', {name: placeName}).should('be.visible');
    cy.findByText(placeAddress).should('be.visible');

    cy.log('**Clicking the close button closes the place info**');
    cy.findByRole('button', {name: buttonLabel.closePlaceDetail}).click();
    cy.findByRole('heading', {name: placeName}).should('not.exist');

    cy.log('**Clicking the place on the map reopens the place info**');
    cy.findByRole('button', {name: placeName}).click();
    cy.findByRole('heading', {name: placeName}).should('be.visible');
  });

  it(`allows user to close search box`, () => {
    cy.log('**Verify the absence of elements to be shown**');
    cy.findByRole('button', {name: buttonLabel.closeSearchbox}).should(
      'not.exist',
    );

    cy.log('**Clicking search icon button...**');
    cy.findByRole('button', {name: buttonLabel.search}).click();
    cy.log('**...Shows a close button**');
    cy.findByRole('button', {name: buttonLabel.closeSearchbox}).should(
      'be.visible',
    );

    cy.log('**Clicking the close button...**');
    cy.findByRole('button', {name: buttonLabel.closeSearchbox}).click();
    cy.log('**...Hides the search box**');
    cy.findByRole('combobox').should('not.exist');
    cy.log('**...Focuses the search icon button');
    cy.focused().should('have.attr', 'aria-label', buttonLabel.search);
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
  // TODO #188: Make it work
  it.skip('allows keyboard users to select an autocomplete suggestion with arrow keys', () => {
    cy.log(`**Setup**`);
    cy.findByRole('button', {name: buttonLabel.search}).click();
    cy.focused().realType(searchWords);

    cy.log(`**Pressing Down Arrow key...**`);
    cy.focused().type('{downarrow}');
    cy.log(`**...highlights the first autocomplete suggestion**`);
    // below doesn't work;
    Object.keys(autocomplete.focus).forEach(key => {
      cy.findByRole('listbox')
        .get('li:first')
        .should('have.css', key, autocomplete.focus[key]);
    }); // error message: expected <li> to have CSS property outline with the value 1px solid red, but the value was rgb(218, 218, 218) none 0px
  });
});
