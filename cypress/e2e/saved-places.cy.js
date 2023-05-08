import {interceptIndefinitely} from '../../test/utils/cypress';
import {
  buttonLabel,
  editorLabel,
  linkText,
  loadingMessage,
  modal,
} from '../../src/utils/uiCopies';
import {mockPlace5, mockPlace8} from '../../test/utils/mockData';

describe('Saved place detail feature', () => {
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
  });
  it('Clicking place mark shows correct UI', () => {
    cy.log(`Clicking place mark...`);
    cy.findByRole('button', {name: mockPlace5.properties.name}).click();

    cy.log(`...autofocuses the close button`);
    cy.focused().should('have.attr', 'data-testid', 'close-button-saved-place');
    cy.log(`...shows place name (as heading)`);
    cy.findByRole('heading', {name: mockPlace5.properties.name}).should(
      'be.visible',
    );
    cy.log(`...shows note with URL text as a link on the place`);
    cy.findByRole('link', {name: /asahi\.com.*/i}).should('be.visible');
    cy.log(`...does not hide place marker on the map`);
    // UI snapshot is also taken in snapshot-saved-places.js
    cy.findByRole('button', {name: mockPlace5.properties.name}).should(
      'be.visible',
    );
    // this fails if another element covers it up
    // while should('be.visible') won't fail in that case
    // DO NOT ADD ANY MORE ASSERTIONS HERE; place detail is now hidden.
  });
  it('Place marks without Google Maps URL', () => {
    cy.log(`Clicking place mark...`);
    cy.findByRole('button', {name: mockPlace8.properties.name}).click();
    cy.log(`...disables the "More Info" button`);
    cy.findByRole('link', {name: linkText.searchedPlace})
      .should('not.have.attr', 'href')
      .should('have.css', 'cursor', 'not-allowed');
  });
  it('Clicking close button closes place detail', () => {
    cy.log(`Setup`);
    cy.findByRole('button', {name: mockPlace5.properties.name}).click();
    cy.log('Clicking the close button...');
    cy.findByRole('button', {name: buttonLabel.closePlaceDetail}).click();
    cy.log(`...Hides the place name (as heading)`);
    cy.findByRole('heading', {name: mockPlace5.properties.name}).should(
      'not.exist',
    );
    cy.log(`...Keeps the place marker to be shown`);
    cy.findByRole('button', {name: mockPlace5.properties.name}).click();
    // This fails if another element covers it up
    // while should('be.visible') won't fail in that case
  });
  it('Pressing ESC key closes place detail', () => {
    cy.log(`Setup`);
    cy.findByRole('button', {name: mockPlace5.properties.name}).click();
    cy.log('Pressing ESC key...');
    cy.get('body').type('{esc}');
    cy.log(`...Hides the place name (as heading)`);
    cy.findByRole('heading', {name: mockPlace5.properties.name}).should(
      'not.exist',
    );
    cy.log(`...Keeps the place marker to be shown`);
    cy.findByRole('button', {name: mockPlace5.properties.name}).click();
    // This fails if another element covers it up
    // while should('be.visible') won't fail in that case
  });
  it('Pressing outside the popup closes place detail', () => {
    cy.log(`Setup`);
    cy.findByRole('button', {name: mockPlace5.properties.name}).click();
    cy.log('Pressing outside the popup...');
    cy.get('body').click('center', {force: true});
    cy.log(`...Hides the place name (as heading)`);
    cy.findByRole('heading', {name: mockPlace5.properties.name}).should(
      'not.exist',
    );
    cy.log(`...Keeps the place marker to be shown`);
    cy.findByRole('button', {name: mockPlace5.properties.name}).click();
    // This fails if another element covers it up
    // while should('be.visible') won't fail in that case
  });
  it('Clicking Delete button removes the saved place', () => {
    cy.log(`Preparing for testing loading messages`);
    const interception = interceptIndefinitely('/api/places');
    cy.log(`Setup`);
    cy.findByRole('button', {name: mockPlace5.properties.name}).click();
    cy.log(`Clicking Delete button...`);
    cy.findByRole('button', {name: buttonLabel.delete}).click();
    cy.log(`...overlays a scrim to prevent interactions outside the dialog`);
    cy.get('body').click('top', {force: true});
    cy.findByRole('button', {name: buttonLabel.edit}).should('not.exist');
    cy.log(`...pops up a dialog to confirm the deletion of the place`);
    cy.findByRole('alertdialog').contains(
      modal.delete.title(mockPlace5.properties.name),
    );
    cy.findByRole('alertdialog').contains(
      modal.delete.body(mockPlace5.properties.name),
    );
    cy.log(`...sets the body element to be non-scrollable`);
    cy.get('body').should('have.css', 'overflow', 'hidden');
    cy.log(`Clicking Delete button on the dialog...`);
    cy.findByRole('button', {name: buttonLabel.delete}).click();
    cy.log('...initially shows a loading message');
    cy.findByText(loadingMessage.delete(mockPlace5.properties.name))
      .should('be.visible')
      .then(() => {
        cy.log(`And then...`);
        interception.sendResponse();
        cy.log(`...deletes the saved place`);
        cy.findByRole('button', {name: mockPlace5.properties.name}).should(
          'not.exist',
        );
      });
  });
  it('Allows users to avoid deleting a place by mistake', () => {
    cy.log(`Setup for Cancel button`);
    cy.findByRole('button', {name: mockPlace5.properties.name}).click();
    cy.findByRole('button', {name: buttonLabel.delete}).click();
    cy.log(`Clicking Cancel button in the dialog...`);
    cy.findByRole('button', {name: buttonLabel.cancel}).click();
    cy.log(`...closes the dialog`);
    cy.findByRole('alertdialog').should('not.exist');
    cy.log(`...shows the place detail popup`);
    cy.findByRole('heading', {name: mockPlace5.properties.name}).should(
      'be.visible',
    );
    cy.log(`Setup for ESC key`);
    cy.findByRole('button', {name: buttonLabel.delete}).click();
    cy.log(`Pressing ESC key...`);
    cy.get('body').type('{esc}');
    cy.log(`...closes the dialog`);
    cy.findByRole('alertdialog').should('not.exist');
    cy.log(`...shows the place detail popup`);
    cy.findByRole('heading', {name: mockPlace5.properties.name}).should(
      'be.visible',
    );
  });
  it('Traps focus inside the alert dialog', () => {
    cy.log(`Setup`);
    cy.findByRole('button', {name: mockPlace5.properties.name}).click();
    cy.log(`Clicking Delete button...`);
    cy.findByRole('button', {name: buttonLabel.delete}).click();
    cy.log(`...autofocuses the Cancel button`);
    // cy.focused().contains(buttonLabel.cancel); TODO #252 Fix this assertion; for some reason, no element is found to be focused...
    cy.log(`Pressing Tab key...`);
    cy.realPress('Tab');
    cy.log(`...focuses the Delete button`);
    cy.focused().contains(buttonLabel.delete);
    cy.log(`Pressing Tab key once more...`);
    cy.realPress('Tab');
    cy.log(`...focuses the Cancel button`);
    cy.focused().contains(buttonLabel.cancel);
    cy.log(`Pressing Shift + Tab...`);
    cy.realPress(['Shift', 'Tab']);
    cy.log(`...focuses the Delete button`);
    cy.focused().contains(buttonLabel.delete);
    cy.log(`Pressing Shift + Tab once more...`);
    cy.realPress(['Shift', 'Tab']);
    cy.log(`...focuses the Cancel button`);
    cy.focused().contains(buttonLabel.cancel);
    cy.log(`Pressing Cancel button...`);
    cy.findByRole('button', {name: buttonLabel.cancel}).click();
    cy.log(`...autofocuses the Delete button`);
    cy.focused().contains(buttonLabel.delete);
  });
});
describe('Editing notes on saved places', () => {
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
    cy.log(`Clicking place mark...`);
    cy.findByRole('button', {name: mockPlace5.properties.name}).click();
    cy.log(`Clicking Edit button...`);
    cy.findByRole('button', {name: buttonLabel.edit}).click();
  });
  it('Happy path: users can add their own note on the place', () => {
    cy.log(`Preparing for testing loading messages`);
    const interception = interceptIndefinitely('/api/places');
    // UI check
    cy.log(`...shows the editor title`);
    cy.findByRole('heading', {name: editorLabel, timeout: 20000}).should(
      'be.visible',
    );
    cy.log(`...autofocuses the note`);
    cy.focused().should('have.attr', 'role', 'textbox');
    cy.log(
      `...tells screen readers that pressing the Enter key will insert a line break, not submit the entered text`,
    );
    cy.focused().should('have.attr', 'aria-multiline', 'true');
    // Execute
    cy.log(`Pressing Down Arrow key and typing URL text...`);
    cy.findByRole('textbox').type('{downarrow}');
    cy.focused().type('https://google.com ');
    // Verify
    cy.log(`...updates the place note`);
    cy.contains('https://google.com').should('be.visible');
    // Execute
    cy.log(`Clicking Save button...`);
    cy.findByRole('button', {name: buttonLabel.saveEdit}).click();
    // Verify
    cy.log('...initially shows a loading message');
    cy.findByText(loadingMessage.update)
      .should('be.visible')
      .then(() => {
        cy.log(`And then...`);
        interception.sendResponse();
        cy.log(`...saves the updated place note with text link`);
        cy.findByRole('link', {name: /google\.com.*/i}).should('be.visible');
        cy.findByRole('link', {name: /asahi\.com.*/i}).should('be.visible');

        // Make sure no data is lost due to the editing of place notes
        cy.log(`...shows the place address`);
        cy.findByText(mockPlace5.properties.address).should('be.visible');
        cy.log('...shows the button for more information in Google Maps');
        cy.findByRole('link', {name: linkText.searchedPlace}).should(
          'have.attr',
          'href',
          mockPlace5.properties['Google Maps URL'],
        );

        cy.log(`...autofocuses the close button`);
        cy.focused().should(
          'have.attr',
          'data-testid',
          'close-button-saved-place',
        );

        cy.log(`Reloading the page...`);
        cy.reload();
        cy.log(`...retains the changes`);
        cy.findByRole('button', {name: mockPlace5.properties.name}).click();
        cy.findByRole('link', {name: /google\.com.*/i}).should('be.visible');
      });
  });
  it('Place name is editable', () => {
    cy.log(`Typing text...`);
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100); // otherwise, Cypress will type 'bc', not 'abc'. This is a known issue. See https://www.cypress.io/blog/2019/01/22/when-can-the-test-click/
    cy.findByRole('textbox').type('abc ');
    cy.log(`...updates the place name*`);
    cy.findByRole('heading', {level: 2}).should('include.text', 'abc', {
      timeout: 20000,
    });
    // Execute
    cy.log(`Clicking Save button...`);
    cy.findByRole('button', {name: buttonLabel.saveEdit}).click();
    // Verify
    cy.log(`...saves the updated place name`);
    cy.findByRole('heading', {
      name: 'abc ' + mockPlace5.properties.name,
    }).should('be.visible');
    cy.log(`...updates the place mark`);
    cy.findByRole('button', {
      name: 'abc ' + mockPlace5.properties.name,
    }).should('be.visible');
  });
  it('Clicking Cancel button closes editor without saving any changes', () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100); // otherwise, Cypress will type 'bc', not 'abc'. This is a known issue. See https://www.cypress.io/blog/2019/01/22/when-can-the-test-click/
    cy.log(`Editing the note...`);
    cy.findByRole('textbox').type('abc ');
    cy.findByRole('textbox').type('{downarrow}');
    cy.focused().type('https://google.com ');

    cy.log(`But clicking Cancel button...`);
    cy.findByRole('button', {name: /cancel/i}).click();
    cy.log(`...does not save any change`);
    cy.findByRole('heading', {
      name: 'abc ' + mockPlace5.properties.name,
    }).should('not.exist');
    cy.findByRole('link', {name: /google\.com.*/i}).should('not.exist');
    cy.findByRole('button', {name: 'abc ' + mockPlace5.properties.name}).should(
      'not.exist',
    );
    cy.log(`...shows the original place detail`);
    cy.findByRole('heading', {name: mockPlace5.properties.name}).should(
      'be.visible',
    );
    cy.findByRole('link', {name: /asahi\.com.*/i}).should('be.visible');
    cy.findByRole('button', {name: mockPlace5.properties.name}).should(
      'be.visible',
    );
    cy.log(`...autofocuses the close button`);
    cy.focused().should('have.attr', 'data-testid', 'close-button-saved-place');
  });
});
describe('Edge cases', () => {
  beforeEach(() => {
    cy.log('Resetting the database');
    cy.exec('npx prisma migrate reset --force'); // https://docs.cypress.io/guides/end-to-end-testing/testing-your-app#Seeding-data
    cy.log('Setting up');
    cy.auth();
    cy.visit('/');
    cy.waitForMapToLoad();
  });
  it.skip('Searching a place just deleted will drop a place mark and show its detail', () => {
    // TODO #428: Fix this test
    cy.log(`Setup: Saving a place`);
    const savedPlaceName = 'Kyoto Station';
    cy.findByRole('button', {name: buttonLabel.search}).click();
    cy.focused().realType(savedPlaceName);
    cy.findByRole('option', {name: savedPlaceName})
      .should('be.visible')
      .click(); // This fails...
    cy.findByRole('button', {name: buttonLabel.saveSearchedPlace}).click();
    cy.findByRole('button', {name: buttonLabel.saveEdit}).click();
    cy.log(`Setup: Deleting a place`);
    cy.findByRole('button', {name: savedPlaceName}).click();
    cy.findByRole('button', {name: buttonLabel.delete}).click();
    cy.findByRole('button', {name: buttonLabel.delete}).click();
    cy.log(`Execute: Searching for the place just deleted...`);
    cy.findByRole('button', {name: buttonLabel.search}).click();
    cy.focused().realType(savedPlaceName);
    cy.findByRole('option', {name: savedPlaceName})
      .should('be.visible')
      .click(); // This fails...
    cy.log('Verify: ...Shows the place on the map');
    cy.findByRole('button', {name: savedPlaceName}).should('be.visible');
    cy.findByRole('heading', {name: savedPlaceName}).should('be.visible');
  });
});
