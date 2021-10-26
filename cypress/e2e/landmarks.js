import {buttonLabel} from '../../src/utils/uiCopies';

it('Landmark roles are given appropriately', () => {
  cy.visit('/');
  cy.waitForMapToLoad();
  cy.log('*** Main role for map ***');
  cy.findByRole('main').contains(/map data/i);
  cy.log('*** Navigation role for menu button ***');
  cy.findByRole('navigation').contains(buttonLabel.menu);
  cy.log('*** Search role for search button ***');
  cy.findByRole('search').contains(buttonLabel.search);
  cy.log('*** Region role for save button ***');
  cy.findByRole('region', {name: 'controls'}).contains(buttonLabel.save);
  cy.log('*** Region role for locator button ***');
  cy.findByRole('region', {name: 'controls'}).contains(
    buttonLabel.locator.default,
  );
});
