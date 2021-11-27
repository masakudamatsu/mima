import {buttonLabel} from '../../src/utils/uiCopies';

const placeName = '出逢ひ茶屋おせん';

describe('Clicking a saved place', () => {
  beforeEach(() => {
    cy.visit('/');
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
    });
    it('Shows the text editor', () => {
      cy.findByRole('textbox').type('abc ');
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
      cy.findByRole('button', {name: /save/i}).click();
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
    cy.findByRole('button', {name: placeName}).click();
    cy.findByRole('button', {name: buttonLabel.edit}).click();
  });
  describe('Editing place name and ...', () => {
    beforeEach(() => {
      cy.findByRole('textbox').type('abc ');
    });
    it('Pressing Cancel button discards any change', () => {
      cy.findByRole('button', {name: /cancel/i}).click();
      cy.findByText('abc').should('not.exist');
    });
    it('Pressing Save button changes place name', () => {
      cy.findByRole('button', {name: /save/i}).click();
      cy.findByText('abc ' + placeName).should('be.visible');
      cy.findByRole('button', {name: 'abc ' + placeName}).should('be.visible');
    });
  });
  describe('Adding text to place note and ...', () => {
    beforeEach(() => {
      cy.findByRole('textbox').type('{downarrow}abc ');
    });
    it('Pressing Cancel button discards any change', () => {
      cy.findByRole('button', {name: /cancel/i}).click();
      cy.findByText('abc').should('not.exist');
    });
    it('Pressing Save button changes place note', () => {
      cy.findByRole('button', {name: /save/i}).click();
      cy.findByText(/abc */).should('be.visible');
    });
  });
  describe('Adding URL to place note and ...', () => {
    beforeEach(() => {
      cy.findByRole('textbox').type('{downarrow}https://google.com ');
    });
    it('Pressing Cancel button discards any change', () => {
      cy.findByRole('button', {name: /cancel/i}).click();
      cy.findByRole('link', {name: /google\.com.*/i}).should('not.exist');
    });
    it('Pressing Save button changes place note', () => {
      cy.findByRole('button', {name: /save/i}).click();
      cy.findByRole('link', {name: /google\.com.*/i}).should('be.visible');
    });
  });
});
