import {buttonLabel} from '../../src/utils/uiCopies';

beforeEach(() => {
  cy.auth('testuser1');
});
it('Landmark roles are given appropriately', () => {
  cy.visit('/');
  cy.waitForMapToLoad();
  cy.log('Main role for map');
  cy.findByRole('main').contains(/map data/i);
  cy.log('Navigation role for menu button');
  cy.findByRole('navigation').findByRole('button', {name: buttonLabel.menu});
  cy.log('Search role for search button');
  cy.findByRole('search').findByRole('button', {name: buttonLabel.search});
  cy.log('Region role for save button');
  cy.findByRole('region', {name: 'controls'}).findByRole('button', {
    name: buttonLabel.save,
  });
  cy.log('Region role for locator button');
  cy.findByRole('region', {name: 'controls'}).findByRole('button', {
    name: buttonLabel.locator.default,
  });
});
