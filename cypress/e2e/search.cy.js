import {buttonLabel, linkText, searchBoxLabel} from '../../src/utils/uiCopies';
import {
  boldText,
  minPopupWidth,
  popupWidthShare,
} from '../../src/utils/designtokens';
const searchWords = [/nijo/i, /koya/i];
const placeName = /.*nijo.*koya.*/i;
const placeAddress = '382-3 Mogamichō, Nakagyo Ward, Kyoto, 604-8303, Japan';
describe('Search feature', () => {
  beforeEach(() => {
    cy.log('Loading app');
    cy.auth();
    cy.visit('/');
    cy.waitForMapToLoad();
  });
  it('happy path for mobile/mouse users', () => {
    cy.log('Verify the absence of elements to be shown');
    cy.findByRole('combobox').should('not.exist');
    cy.findByRole('option', {name: placeName.regex}).should('not.exist');
    cy.findByRole('button', {name: placeName.japanese}).should('not.exist');

    cy.log('Clicking search icon button...');
    cy.findByRole('button', {name: buttonLabel.search}).click();
    cy.log('...Shows a search box');
    cy.findByRole('combobox').should('be.visible');
    cy.log(`...Shows placeholder text "${searchBoxLabel.placeholder}"`);
    cy.findByRole('combobox').should(
      'have.attr',
      'placeholder',
      searchBoxLabel.placeholder,
    );
    cy.log('...Autofocuses the search box');
    cy.focused().should('have.attr', 'type', 'search');

    cy.log('Typing a place name...');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100); // otherwise, Cypress will type 'bc', not 'abc'. This is a known issue. See https://www.cypress.io/blog/2019/01/22/when-can-the-test-click/
    cy.focused().realType(searchWords[0].source);
    cy.findAllByRole('option', {name: searchWords[0], timeout: 20000}).should(
      'be.visible',
    ); // To wait for autocomplete suggestions to be displayed

    cy.log('...Highlights entered text in bold in autocomplete suggestions');
    cy.findAllByText(searchWords[0], {selector: 'b', timeout: 20000}).should(
      'have.css',
      'font-weight',
      boldText.fontWeight.toString(),
    );

    cy.log('Typing more...');
    cy.focused().realPress('Space').realType(searchWords[1].source);
    cy.log('Selecting one of the autocomplete suggestions');
    cy.findByRole('option', {name: placeName, timeout: 20000}).click();
    cy.log('...Shows the place on the map');
    cy.findByRole('button', {name: placeName}).should('be.visible');
    cy.log('...Shows the place info');
    cy.findByRole('heading', {name: placeName}).should('be.visible');
    cy.findByText(placeAddress).should('be.visible');
    cy.log(
      '...Shows the working link to open Google Maps in a new tab for more detailed information',
    );
    cy.findByText(linkText.searchedPlace)
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noreferrer')
      .then(link => {
        cy.request(link.prop('href')).its('status').should('eq', 200);
      });
    // TODO #207: Make the following test pass
    // cy.log('...Focuses the close button');
    // cy.focused().should(
    //   'have.attr',
    //   'aria-label',
    //   buttonLabel.closePlaceDetail,
    // );

    cy.log('Clicking the close button closes the place info');
    cy.findByRole('button', {name: buttonLabel.closePlaceDetail}).click();
    cy.findByRole('heading', {name: placeName}).should('not.exist');

    cy.log('Clicking the place on the map...');
    cy.findByRole('button', {name: placeName}).click();
    cy.log('...reopens the place info');
    cy.findByRole('heading', {name: placeName}).should('be.visible');
    cy.log('...focuses the close button');
    cy.focused().should(
      'have.attr',
      'aria-label',
      buttonLabel.closePlaceDetail,
    );

    cy.log('Pressing Esc key closes the place info');
    cy.get('body').type('{esc}');
    cy.findByRole('heading', {name: placeName}).should('not.exist');

    cy.log('Searching another place...');
    cy.findByRole('button', {name: buttonLabel.search}).click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100); // otherwise, Cypress will type 'bc', not 'abc'. This is a known issue. See https://www.cypress.io/blog/2019/01/22/when-can-the-test-click/
    cy.focused().realType('fukuda art museum');
    cy.findByRole('option', {
      name: /fukuda art museum/i,
      timeout: 20000,
    }).click();
    cy.log('...removes the place mark for the previous search');
    cy.findByRole('button', {name: placeName}).should('not.exist');
  });

  it('keeps displaying autocomplete suggestions when blurring the search box', () => {
    cy.log('Setup: Open search box dialog popup');
    cy.findByRole('button', {name: buttonLabel.search}).click();
    cy.log('Setup: Type a place name');
    cy.focused().realType(searchWords[0].source);
    cy.focused().realPress('Space').realType(searchWords[1].source);
    cy.log('Execute: Blur the search box');
    cy.findByRole('combobox').blur();
    cy.log('Verify: autocomplete suggestions remain visible');
    cy.findByRole('option', {name: placeName, timeout: 20000}).should(
      'be.visible',
    );
  });

  it('removes autocomplete suggestions when deleting all search text', () => {
    cy.log('Setup: Open search box dialog popup');
    cy.findByRole('button', {name: buttonLabel.search}).click();
    cy.log('Setup: Type a place name');
    cy.focused().realType('a');
    cy.findAllByRole('option', {timeout: 20000}).should('be.visible');
    cy.log('Execute: Delete all search text');
    cy.findByRole('combobox').realType('{backspace}');
    cy.log('Verify: autocomplete suggestions disappear');
    cy.findAllByRole('option', {timeout: 20000}).should('not.exist');
  });
  it(`allows user to close search box`, () => {
    cy.log('Verify the absence of elements to be shown');
    cy.findByRole('button', {name: buttonLabel.closeSearchbox}).should(
      'not.exist',
    );

    cy.log('Clicking search icon button...');
    cy.findByRole('button', {name: buttonLabel.search}).click();
    cy.log('...Shows a close button');
    cy.findByRole('button', {name: buttonLabel.closeSearchbox}).should(
      'be.visible',
    );

    cy.log('Clicking the close button...');
    cy.findByRole('button', {name: buttonLabel.closeSearchbox}).click();
    cy.log('...Hides the search box');
    cy.findByRole('combobox').should('not.exist');
    cy.log('...Focuses the search icon button');
    cy.focused().should('have.attr', 'aria-label', buttonLabel.search);
  });
  it('Wide screen users can close search box by clicking outside the popup', () => {
    cy.log('Setup: Screen width');
    const breakpoint = minPopupWidth / popupWidthShare;
    cy.viewport(breakpoint, 800); // 800px high for MacBook 13
    cy.log('Execute: Click search icon button, and ...');
    cy.findByRole('button', {name: buttonLabel.search}).click();
    cy.log('Execute: Click anywhere outside the search box popup');
    cy.get('body').click('left', {force: true});
    cy.log('Verify: Searchbox closes');
    cy.findByRole('combobox').should('not.exist');
  });
  it('traps the focus within the search box dialog popup', () => {
    cy.log('Setup: Open search box dialog popup');
    cy.findByRole('button', {name: buttonLabel.search}).click();
    cy.log('Focusing the last focusable element, and...');
    cy.findByTestId('searchbox-last-focusable-element').focus();
    cy.log('Pressing Tab key...');
    cy.realPress('Tab');
    cy.log('...focuses the first focusable element');
    cy.focused().should(
      'have.attr',
      'data-testid',
      'searchbox-first-focusable-element',
    );
  });
  it('allows keyboard users to select an autocomplete suggestion with arrow keys', () => {
    cy.log(`Setup`);
    cy.findByRole('button', {name: buttonLabel.search}).click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100); // otherwise, Cypress will type 'bc', not 'abc'. This is a known issue. See https://www.cypress.io/blog/2019/01/22/when-can-the-test-click/
    cy.focused().realType(searchWords[0].source);

    cy.log(`Pressing Down Arrow key...`);
    cy.get('body').realPress('{downarrow}');
    cy.log(`...highlights the first autocomplete suggestion`);
    cy.findAllByRole('option', {timeout: 20000}).each((item, index) => {
      if (index === 0) {
        cy.wrap(item).should('have.attr', 'data-highlighted', 'true');
      } else {
        cy.wrap(item).should('have.attr', 'data-highlighted', 'false');
      }
    });
    cy.log(`Pressing Enter key...`);
    cy.get('body').realPress('{enter}');
    cy.log(`...shows the place detail`);
    cy.findByText(linkText.searchedPlace).should('be.visible'); // agnostic about place name
  });
});
