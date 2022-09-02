import {buttonLabel, editorLabel} from '../../src/utils/uiCopies';

const placeName = '出逢ひ茶屋おせん';

describe('Clicking a saved place', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForMapToLoad();
    cy.findByRole('button', {name: placeName}).click();
  });
  it('Shows the place name (as heading)', () => {
    cy.findByRole('heading', {name: placeName}).should('be.visible');
  });
  it('Shows the note with URL text as a link on the place', () => {
    cy.findByRole('link', {name: /asahi\.com.*/i}).should('be.visible');
  });
  it('Keeps the place marker to be shown', () => {
    // UI snapshot is also taken in snapshot-saved-places.js
    cy.findByRole('button', {name: placeName}).click();
    // this fails if another element covers it up
    // while should('be.visible') won't fail in that case
  });
  it('Autofocuses the close button', () => {
    cy.focused().should('have.attr', 'data-testid', 'close-button-saved-place');
  });
});

describe('Once place detail is shown', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForMapToLoad();
    cy.findByRole('button', {name: placeName}).click();
  });
  describe('Clicking the close button', () => {
    beforeEach(() => {
      cy.findByRole('button', {name: buttonLabel.close}).click();
    });
    it('Hides the place name (as heading)', () => {
      cy.findByRole('heading', {name: placeName}).should('not.exist');
    });
    it('Keeps the place marker to be shown', () => {
      cy.findByRole('button', {name: placeName}).click();
      // This fails if another element covers it up
      // while should('be.visible') won't fail in that case
    });
  });
  describe('Pressing ESC key', () => {
    beforeEach(() => {
      cy.get('body').type('{esc}');
    });
    it('Hides the place name (as heading)', () => {
      cy.findByRole('heading', {name: placeName}).should('not.exist');
    });
    it('Keeps the place marker to be shown', () => {
      cy.findByRole('button', {name: placeName}).click();
      // This fails if another element covers it up
      // while should('be.visible') won't fail in that case
    });
  });
  describe('Pressing outside the place detail window', () => {
    beforeEach(() => {
      cy.get('body').click('center', {force: true});
    });
    it('Hides the place name (as heading)', () => {
      cy.findByRole('heading', {name: placeName}).should('not.exist');
    });
    it('Keeps the place marker to be shown', () => {
      cy.findByRole('button', {name: placeName}).click();
      // This fails if another element covers it up
      // while should('be.visible') won't fail in that case
    });
  });
  describe('Pressing Edit button', () => {
    beforeEach(() => {
      cy.findByRole('button', {name: buttonLabel.edit}).click();
      // wait for lazy-loading to be done
      cy.findByRole('heading', {name: editorLabel, timeout: 20000}).should(
        'be.visible',
      );
    });
    it('Shows the text editor', () => {
      cy.findByRole('textbox').enter('abc ');
      cy.contains('abc');
    });
    it('Focuses the note field', () => {
      cy.focused().should('have.attr', 'role', 'textbox');
    });
    it('Shows Cancel button, the pressing of which closes the editor and focuses the Close button', () => {
      cy.findByRole('button', {name: /cancel/i}).click();
      cy.findByRole('link', {name: /asahi\.com.*/i}).should('be.visible');
      cy.focused().should(
        'have.attr',
        'data-testid',
        'close-button-saved-place',
      );
    });
    it('Shows Save button, the pressing of which closes the editor and focuses the Close button', () => {
      cy.findByRole('button', {name: buttonLabel.saveEdit}).click();
      cy.findByRole('link', {name: /asahi\.com.*/i}).should('be.visible');
      cy.focused().should(
        'have.attr',
        'data-testid',
        'close-button-saved-place',
      );
    });
  });
});
describe('Once place info editor is shown', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForMapToLoad();
    cy.findByRole('button', {name: placeName}).click();
    cy.findByRole('button', {name: buttonLabel.edit}).click();
    // wait for lazy-loading to be done
    cy.findByRole('heading', {name: editorLabel, timeout: 20000}).should(
      'be.visible',
    );
  });
  describe('Editing place name and ...', () => {
    it('Pressing Cancel button discards any change', () => {
      // execute
      cy.findByRole('textbox').enter('abc ');
      cy.findByRole('button', {name: /cancel/i}).click();
      // verify
      cy.findByText('abc').should('not.exist');
    });
    it('Pressing Save button changes place name', () => {
      // execute
      cy.findByRole('textbox').enter('abc ');
      cy.findByRole('button', {name: buttonLabel.saveEdit}).click();
      // verify
      cy.findByText('abc ' + placeName).should('be.visible');
      cy.findByRole('button', {name: 'abc ' + placeName}).should('be.visible');

      cy.log(`**...and the changes persist after page reload**`);
      // execute
      cy.reload();
      // verify
      cy.findByRole('button', {name: 'abc ' + placeName}).should('be.visible');
    });
  });
  describe('Adding text to place note and ...', () => {
    it('Pressing Cancel button discards any change', () => {
      // setup
      cy.findByRole('textbox').type('{downarrow}');
      cy.focused().enter('abc');
      cy.findByRole('textbox').get('p').contains('abc');
      // execute
      cy.findByRole('button', {name: /cancel/i}).click();
      // verify
      cy.findByText('abc').should('not.exist');
    });
    it('Pressing Save button changes place note', () => {
      // setup
      cy.findByRole('textbox').type('{downarrow}');
      cy.focused().enter('abc');
      cy.findByRole('textbox').get('p').contains('abc');
      // execute
      cy.findByRole('button', {name: buttonLabel.saveEdit}).click();
      // verify
      cy.findByText(/abc */).should('be.visible');
    });
  });
  describe('Adding URL to place note and ...', () => {
    beforeEach(() => {
      cy.findByRole('textbox').type('{downarrow}');
      cy.focused().enter('https://google.com ');
      // verify
      cy.findByRole('textbox').get('p').contains('https://google.com');
    });
    it('Pressing Cancel button discards any change', () => {
      cy.findByRole('button', {name: /cancel/i}).click();
      cy.findByRole('link', {name: /google\.com.*/i}).should('not.exist');
    });
    it('Pressing Save button changes place note', () => {
      cy.findByRole('button', {name: buttonLabel.saveEdit}).click();
      cy.findByRole('link', {name: /google\.com.*/i}).should('be.visible');
    });
  });
});
