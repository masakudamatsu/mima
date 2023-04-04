import {buttonLabel} from '../../src/utils/uiCopies';

const placeName = '出逢ひ茶屋おせん';
describe('Editor feature', () => {
  beforeEach(() => {
    cy.log('Resetting the database');
    cy.exec('npx prisma migrate reset --force'); // https://docs.cypress.io/guides/end-to-end-testing/testing-your-app#Seeding-data
    cy.log('Setting up');
    cy.auth('subscribed_user2', {
      username: Cypress.env('auth0UserSubscribed2'),
      password: Cypress.env('auth0PassSubscribed2'),
    });
    cy.visit('/');
    cy.waitForMapToLoad();
    cy.log('Opening the editor');
    cy.findByRole('button', {name: placeName}).click();
    cy.findByRole('button', {name: buttonLabel.edit}).click();
  });
  it(`Saving a note without place name will show 'Unnamed place' as place name`, () => {
    cy.log('Preparing for deleting the whole place name');
    const del = '{del}';
    let keystroke = '';
    for (let i = 0; i < placeName.length; i++) {
      keystroke = del + keystroke;
    }
    cy.log('Deleting place name and saving the note...');
    cy.findByRole('textbox').type(keystroke);
    cy.findByText(placeName).should('not.exist'); // verify if above commands work
    cy.findByRole('button', {name: buttonLabel.saveEdit}).click();
    cy.log(`...shows 'Unnamed place' as its place name`);
    cy.findByText('Unnamed place').should('be.visible');
  });
});
