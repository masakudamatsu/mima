import {interceptIndefinitely} from '../../test/utils/cypress';
import {
  buttonLabel,
  editorLabel,
  linkText,
  loadingMessage,
} from '../../src/utils/uiCopies';

const searchedPlace = {
  name: /fukuda art museum/i,
  address:
    '3-16 Sagatenryūji Susukinobabachō, Ukyo Ward, Kyoto, 616-8385, Japan',
  url: 'https://maps.google.com/?cid=540503174389752899',
};
describe('Saving feature', () => {
  beforeEach(() => {
    cy.log('Resetting the database');
    cy.exec('npx prisma migrate reset --force'); // https://docs.cypress.io/guides/end-to-end-testing/testing-your-app#Seeding-data
    cy.log('Loading app');
    cy.auth();
    cy.visit('/');
    cy.waitForMapToLoad();
    cy.log('Verify a place to be saved is not marked on the map yet');
    cy.findByRole('button', {name: searchedPlace.name}).should('not.exist');
    cy.log('Search the place to be saved');
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
    cy.log(`Preparing for testing loading messages`);
    const interception = interceptIndefinitely('/api/places');
    cy.log('Clicking the save button on the searched place detail popup');
    cy.findByRole('button', {name: buttonLabel.saveSearchedPlace}).click();
    cy.log('...shows the text editor');
    cy.findByRole('form', {name: editorLabel.title}).should('be.visible'); // see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/form_role#description
    cy.findByRole('heading', {name: editorLabel.title}).should('be.visible');
    cy.findByRole('textbox', {name: editorLabel.ariaLabel.note}).contains(
      searchedPlace.name,
    );
    cy.log(
      '...shows the placeholder text for where the user can enter their notes',
    );
    cy.findByRole('textbox', {name: editorLabel.ariaLabel.note})
      .children('p')
      .should(
        'have.attr',
        'data-placeholder',
        editorLabel.placeholder.placeNote,
      ); // see https://github.com/masakudamatsu/mima/issues/453#issuecomment-1546767334
    cy.log('Clicking the save button in the text editor');
    cy.findByRole('button', {name: buttonLabel.saveEdit}).click();
    cy.log('...initially shows a loading message');
    cy.findByText(loadingMessage.create)
      .should('be.visible')
      .then(() => {
        cy.log(`And then...`);
        interception.sendResponse();
        cy.log('...closes the text editor');
        cy.findByRole('textbox', {name: editorLabel.ariaLabel.note}).should(
          'not.exist',
        );
        cy.log('...renders the marker at the saved place location');
        cy.findByRole('button', {name: searchedPlace.name}).should(
          'be.visible',
        );
        // TODO #431: add id to <h2> in Tiptap so it can be referred to with aria-labelledby
        // cy.log('...shows the place detail popup');
        // cy.findByRole('dialog', {name: searchedPlace.name}).should('be.visible');
        cy.log('...shows the place name');
        cy.findByRole('heading', {name: searchedPlace.name}).should(
          'be.visible',
        );
        cy.log('...shows the place address');
        cy.findByText(searchedPlace.address).should('be.visible');
        cy.log('...shows the button for editing the note');
        cy.findByRole('button', {name: buttonLabel.edit}).should('be.visible');
        cy.log('...shows the button for deleting the place');
        cy.findByRole('button', {name: buttonLabel.delete}).should(
          'be.visible',
        );
        cy.log('...shows the button for more information in Google Maps');
        cy.findByRole('link', {name: linkText.searchedPlace})
          .should('have.attr', 'target', '_blank')
          .should('have.attr', 'rel', 'noreferrer')
          .should('have.attr', 'href', searchedPlace.url)
          .then(link => {
            cy.request(link.prop('href')).its('status').should('eq', 200);
          });
        cy.log(
          '...shows the button for seeing how to get there in Google Maps',
        );
        cy.findByRole('link', {name: linkText.directions})
          .should('have.attr', 'target', '_blank')
          .should('have.attr', 'rel', 'noreferrer')
          .then(link => {
            cy.request(link.prop('href')).its('status').should('eq', 200);
          }); // exact URL cannot be tested because place ID changes every time
        cy.log('...allows user to close the popup');
        cy.findByRole('button', {name: buttonLabel.closePlaceDetail}).click();
        cy.findByRole('heading', {name: searchedPlace.name}).should(
          'not.exist',
        );
      });
  });
  it('cancel button', () => {
    cy.log('Setting up');
    cy.findByRole('button', {name: buttonLabel.saveSearchedPlace}).click();
    cy.log('Clicking the cancel button...');
    cy.findByRole('button', {name: /cancel/i}).click();
    cy.log('...closes the text editor');
    cy.findByRole('textbox', {name: editorLabel.ariaLabel.note}).should(
      'not.exist',
    );
    cy.log('...shows the searched place detail');
    cy.findByRole('heading', {name: searchedPlace.name}).should('be.visible');
  });
});
