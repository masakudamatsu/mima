import {buttonLabel} from '../../src/utils/uiCopies';

const placeName = '出逢ひ茶屋おせん';

describe('After clicking a saved place', () => {
  describe('UI changes as expected', () => {
    it('Daytime', () => {
      cy.visitAtDaytime('/');
      cy.waitForMapToLoad();
      // execute
      cy.findByRole('button', {name: placeName}).click();
      // verify
      cy.percySnapshot('saved-place-after-click-daytime', {
        widths: [320, 768, 1024],
      });
    });
    it('Nighttime', () => {
      cy.visitAtNight('/');
      cy.waitForMapToLoad();
      // execute
      cy.findByRole('button', {name: placeName}).click();
      // verify
      cy.percySnapshot('saved-place-after-click-nighttime', {
        widths: [320, 768, 1024],
      });
    });
  });
  describe('Clicking the close button', () => {
    it('UI changes as expected', () => {
      cy.visitAtDaytime('/');
      cy.waitForMapToLoad();
      cy.findByRole('button', {name: placeName}).click();
      // execute
      cy.findByRole('button', {name: buttonLabel.close}).click();
      // verify
      cy.percySnapshot('saved-place-after-closed', {
        widths: [320, 768, 1024],
      });
    });
  });
});
