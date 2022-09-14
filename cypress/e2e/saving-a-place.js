import {buttonLabel, editorLabel, linkText} from '../../src/utils/uiCopies';

const searchedPlace = {
  name: /fukuda art museum/i,
  address:
    '3-16 Sagatenryūji Susukinobabachō, Ukyo Ward, Kyoto, 616-8385, Japan',
  url: 'https://maps.google.com/?cid=540503174389752899',
};
describe('Saving feature', () => {
  beforeEach(() => {
    cy.log('**Loading app**');
    cy.visit('/');
    cy.waitForMapToLoad();
    cy.log('**Verify a place to be saved is not marked on the map yet**');
    cy.findByRole('button', {name: searchedPlace.name}).should('not.exist');
    cy.log('**Search the place to be saved**');
    cy.findByRole('button', {name: buttonLabel.search}).click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100); // otherwise, Cypress will type 'bc', not 'abc'. This is a known issue. See https://www.cypress.io/blog/2019/01/22/when-can-the-test-click/
    cy.focused().realType(searchedPlace.name.source);
    cy.findByRole('option', {
      name: searchedPlace.name,
      timeout: 20000,
    }).click();
  });
  it('happy path for mobile/mouse users', () => {
    cy.log('**Clicking the save button on the searched place detail popup**');
    cy.findByRole('button', {name: buttonLabel.saveSearchedPlace}).click();
    cy.log('**...shows the text editor**');
    cy.findByRole('heading', {name: editorLabel}).should('be.visible');
    cy.findByRole('textbox').contains(searchedPlace.name);
    cy.findByRole('textbox').contains(searchedPlace.address);
    cy.findByRole('link', {name: linkText.searchedPlace}).should(
      'have.attr',
      'href',
      searchedPlace.url,
    );
  });
  it('cancel button', () => {
    cy.log('**Setting up**');
    cy.findByRole('button', {name: buttonLabel.saveSearchedPlace}).click();
    cy.log('**Clicking the cancel button...**');
    cy.findByRole('button', {name: /cancel/i}).click();
    cy.log('**...closes the text editor**');
    cy.findByRole('textbox').should('not.exist');
    cy.log('**...shows the searched place detail**');
    cy.findByRole('heading', {name: searchedPlace.name}).should('be.visible');
  });
});
