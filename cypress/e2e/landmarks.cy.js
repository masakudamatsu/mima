import {buttonLabel} from '../../src/utils/uiCopies';

const {mockUser2} = require('../../test/utils/mockUsers');
const mockUserId = mockUser2.userId;

beforeEach(() => {
  cy.log('**Setting mock user session token**');
  cy.loginWithCookie({userId: mockUserId});
});
it('Landmark roles are given appropriately', () => {
  cy.visit('/');
  cy.waitForMapToLoad();
  cy.log('*** Main role for map ***');
  cy.findByRole('main').contains(/map data/i);
  cy.log('*** Navigation role for menu button ***');
  cy.findByRole('navigation').findByRole('button', {name: buttonLabel.menu});
  cy.log('*** Search role for search button ***');
  cy.findByRole('search').findByRole('button', {name: buttonLabel.search});
  cy.log('*** Region role for save button ***');
  cy.findByRole('region', {name: 'controls'}).findByRole('button', {
    name: buttonLabel.save,
  });
  cy.log('*** Region role for locator button ***');
  cy.findByRole('region', {name: 'controls'}).findByRole('button', {
    name: buttonLabel.locator.default,
  });
});
