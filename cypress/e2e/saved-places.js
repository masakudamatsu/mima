import {buttonLabel} from '../../src/utils/uiCopies';

describe('Clicking a saved place', () => {
  const placeName = 'Osen';
  beforeEach(() => {
    cy.visit('/');
    cy.findByRole('button', {name: placeName}).click();
  });
  it('Shows the place name (as heading)', () => {
    cy.findByRole('heading', {name: placeName}).should('be.visible');
  });
  it('Keeps the place marker to be shown', () => {
    // UI snapshot is also taken in snapshot-saved-places.js
    cy.findByRole('button', {name: placeName}).click();
    // this fails if another element covers it up
    // while should('be.visible') won't fail in that case
  });
});

describe('Once place detail is shown', () => {
  const placeName = 'Osen';
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
});
