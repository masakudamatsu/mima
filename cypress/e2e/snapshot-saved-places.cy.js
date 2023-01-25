import {buttonLabel} from '../../src/utils/uiCopies';
import {dimension} from '../../src/utils/designtokens';

const placeName = '出逢ひ茶屋おせん';
const infoUIbreakpoints = [
  Number(dimension.breakpoint.divPopup.padding.slice(0, -2)),
];
const editorUIbreakpoints = [
  Number(dimension.breakpoint.headerEditor.buttonWidth.slice(0, -2)),
  Number(dimension.breakpoint.divPopup.padding.slice(0, -2)),
];
describe('After clicking a saved place', () => {
  describe('UI changes as expected', () => {
    beforeEach(() => {
      cy.auth('subscribed_user2', {
        username: Cypress.env('auth0UserSubscribed2'),
        password: Cypress.env('auth0PassSubscribed2'),
      });
    });
    it('Daytime', () => {
      cy.visitAtDaytime('/');
      cy.waitForMapToLoad();
      // execute
      cy.findByRole('button', {name: placeName}).click();
      // verify
      cy.percySnapshot('saved-place-after-click-daytime', {
        widths: [320, ...infoUIbreakpoints, 768, 1024],
      });
    });
    it('Nighttime', () => {
      cy.visitAtNight('/');
      cy.waitForMapToLoad();
      // execute
      cy.findByRole('button', {name: placeName}).click();
      // verify
      cy.percySnapshot('saved-place-after-click-nighttime', {
        widths: [320, ...infoUIbreakpoints, 768, 1024],
      });
    });
  });
  describe('Clicking the close button', () => {
    beforeEach(() => {
      cy.auth('subscribed_user2', {
        username: Cypress.env('auth0UserSubscribed2'),
        password: Cypress.env('auth0PassSubscribed2'),
      });
    });
    it('UI changes as expected', () => {
      cy.visitAtDaytime('/');
      cy.waitForMapToLoad();
      cy.findByRole('button', {name: placeName}).click();
      // execute
      cy.findByRole('button', {name: buttonLabel.closePlaceDetail}).click();
      // verify
      cy.percySnapshot('saved-place-after-closed', {
        widths: [320, 768, 1024],
      });
    });
  });
  describe('Clicking Edit button', () => {
    beforeEach(() => {
      cy.auth('subscribed_user2', {
        username: Cypress.env('auth0UserSubscribed2'),
        password: Cypress.env('auth0PassSubscribed2'),
      });
    });
    describe('UI changes as expected', () => {
      it('Daytime', () => {
        cy.visitAtDaytime('/');
        cy.waitForMapToLoad();
        cy.findByRole('button', {name: placeName}).click();
        cy.findByRole('button', {name: buttonLabel.edit}).click();
        // verify
        cy.percySnapshot('saved-place-after-edit-daytime', {
          widths: [320, ...editorUIbreakpoints, 768, 1024],
        });
      });
      it('Nighttime', () => {
        cy.visitAtNight('/');
        cy.waitForMapToLoad();
        cy.findByRole('button', {name: placeName}).click();
        cy.findByRole('button', {name: buttonLabel.edit}).click();
        // verify
        cy.percySnapshot('saved-place-after-edit-night', {
          widths: [320, ...editorUIbreakpoints, 768, 1024],
        });
      });
    });
  });
});
