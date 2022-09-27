import {interceptIndefinitely} from '../../test/utils/cypress';
import {
  buttonLabel,
  editorLabel,
  loadingMessage,
} from '../../src/utils/uiCopies';

const placeName = '出逢ひ茶屋おせん';

describe('Saved place detail feature', () => {
  beforeEach(() => {
    cy.log('**Resetting the database**');
    cy.exec('npx prisma migrate reset --force'); // https://docs.cypress.io/guides/end-to-end-testing/testing-your-app#Seeding-data
    cy.visit('/');
    cy.waitForMapToLoad();
  });
  it('Clicking place mark shows correct UI', () => {
    cy.log(`**Clicking place mark...**`);
    cy.findByRole('button', {name: placeName}).click();

    cy.log(`**...autofocuses the close button**`);
    cy.focused().should('have.attr', 'data-testid', 'close-button-saved-place');
    cy.log(`**...shows place name (as heading)**`);
    cy.findByRole('heading', {name: placeName}).should('be.visible');
    cy.log(`**...shows note with URL text as a link on the place**`);
    cy.findByRole('link', {name: /asahi\.com.*/i}).should('be.visible');
    cy.log(`**...does not hide place marker on the map**`);
    // UI snapshot is also taken in snapshot-saved-places.js
    cy.findByRole('button', {name: placeName}).should('be.visible');
    // this fails if another element covers it up
    // while should('be.visible') won't fail in that case
    // DO NOT ADD ANY MORE ASSERTIONS HERE; place detail is now hidden.
  });
  it('Happy path for editing place detail', () => {
    cy.log(`**Preparing for testing loading messages**`);
    const interception = interceptIndefinitely('/api/places');
    cy.log(`**Clicking place mark...**`);
    cy.findByRole('button', {name: placeName}).click();
    cy.log(`**Clicking Edit button...**`);
    cy.findByRole('button', {name: buttonLabel.edit}).click();
    cy.log(`**...shows the editor title**`);
    cy.findByRole('heading', {name: editorLabel, timeout: 20000}).should(
      'be.visible',
    );
    cy.log(`**...autofocuses the note field**`);
    cy.focused().should('have.attr', 'role', 'textbox');

    cy.log(`**Typing text...**`);
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100); // otherwise, Cypress will type 'bc', not 'abc'. This is a known issue. See https://www.cypress.io/blog/2019/01/22/when-can-the-test-click/
    cy.findByRole('textbox').type('abc ');
    cy.log(`**...updates the place name***`);
    cy.findByRole('textbox').get('h2').contains('abc', {timeout: 20000});

    cy.log(`**Pressing Down Arrow key and typing URL text...**`);
    cy.findByRole('textbox').type('{downarrow}');
    cy.focused().type('https://google.com ');
    cy.log(`**...updates the place note**`);
    cy.findByRole('textbox').get('p').contains('https://google.com');

    cy.log(`**Clicking Save button...**`);
    cy.findByRole('button', {name: buttonLabel.saveEdit}).click();
    cy.log('**...initially shows a loading message**');
    cy.findByText(loadingMessage.update)
      .should('be.visible')
      .then(() => {
        cy.log(`**And then...**`);
        interception.sendResponse();
        cy.log(`**...saves the updated place name**`);
        cy.findByRole('heading', {name: 'abc ' + placeName}).should(
          'be.visible',
        );
        cy.log(`**...saves the updated place note with text link**`);
        cy.findByRole('link', {name: /google\.com.*/i}).should('be.visible');
        cy.findByRole('link', {name: /asahi\.com.*/i}).should('be.visible');
        cy.log(`**...updates the place mark**`);
        cy.findByRole('button', {name: 'abc ' + placeName}).should(
          'be.visible',
        );
        cy.log(`**...autofocuses the close button**`);
        cy.focused().should(
          'have.attr',
          'data-testid',
          'close-button-saved-place',
        );

        cy.log(`**Reloading the page...**`);
        cy.reload();
        cy.log(`**...retains the changes**`);
        cy.findByRole('button', {name: 'abc ' + placeName}).should(
          'be.visible',
        );
      });
  });
  it('Clicking close button closes place detail', () => {
    cy.log(`**Setup**`);
    cy.findByRole('button', {name: placeName}).click();
    cy.log('**Clicking the close button...**');
    cy.findByRole('button', {name: buttonLabel.close}).click();
    cy.log(`**...Hides the place name (as heading)**`);
    cy.findByRole('heading', {name: placeName}).should('not.exist');
    cy.log(`**...Keeps the place marker to be shown**`);
    cy.findByRole('button', {name: placeName}).click();
    // This fails if another element covers it up
    // while should('be.visible') won't fail in that case
  });
  it('Pressing ESC key closes place detail', () => {
    cy.log(`**Setup**`);
    cy.findByRole('button', {name: placeName}).click();
    cy.log('**Pressing ESC key...**');
    cy.get('body').type('{esc}');
    cy.log(`**...Hides the place name (as heading)**`);
    cy.findByRole('heading', {name: placeName}).should('not.exist');
    cy.log(`**...Keeps the place marker to be shown**`);
    cy.findByRole('button', {name: placeName}).click();
    // This fails if another element covers it up
    // while should('be.visible') won't fail in that case
  });
  it('Pressing outside the popup closes place detail', () => {
    cy.log(`**Setup**`);
    cy.findByRole('button', {name: placeName}).click();
    cy.log('**Pressing outside the popup...**');
    cy.get('body').click('center', {force: true});
    cy.log(`**...Hides the place name (as heading)**`);
    cy.findByRole('heading', {name: placeName}).should('not.exist');
    cy.log(`**...Keeps the place marker to be shown**`);
    cy.findByRole('button', {name: placeName}).click();
    // This fails if another element covers it up
    // while should('be.visible') won't fail in that case
  });
  it('Clicking Cancel button closes editor without saving any changes', () => {
    cy.log(`**Setup**`);
    cy.findByRole('button', {name: placeName}).click();
    cy.findByRole('button', {name: buttonLabel.edit}).click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100); // otherwise, Cypress will type 'bc', not 'abc'. This is a known issue. See https://www.cypress.io/blog/2019/01/22/when-can-the-test-click/
    cy.findByRole('textbox').type('abc ');
    cy.findByRole('textbox').type('{downarrow}');
    cy.focused().type('https://google.com ');

    cy.log(`**Clicking Cancel button...**`);
    cy.findByRole('button', {name: /cancel/i}).click();
    cy.log(`**...does not save any change**`);
    cy.findByRole('heading', {name: 'abc ' + placeName}).should('not.exist');
    cy.findByRole('link', {name: /google\.com.*/i}).should('not.exist');
    cy.findByRole('button', {name: 'abc ' + placeName}).should('not.exist');
    cy.log(`**...shows the original place detail**`);
    cy.findByRole('heading', {name: placeName}).should('be.visible');
    cy.findByRole('link', {name: /asahi\.com.*/i}).should('be.visible');
    cy.findByRole('button', {name: placeName}).should('be.visible');
    cy.log(`**...autofocuses the close button**`);
    cy.focused().should('have.attr', 'data-testid', 'close-button-saved-place');
  });
  it.only('Clicking Delete button removes the saved place', () => {
    cy.log(`**Setup**`);
    cy.findByRole('button', {name: placeName}).click();
    cy.log(`**Clicking Delete button...**`);
    cy.findByRole('button', {name: buttonLabel.delete}).click();
  });
});
