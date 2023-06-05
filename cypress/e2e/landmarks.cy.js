import {buttonLabel} from '../../src/utils/uiCopies';

describe('Landmark roles', () => {
  beforeEach(() => {
    cy.auth();
  });
  it('Are given to all the top-level elements', () => {
    cy.visit('/');
    cy.waitForMapToLoad();
    cy.log('Main role for map');
    cy.findByRole('main').contains(/map data/i);
    cy.log('Navigation role for menu button');
    cy.findByRole('navigation').findByRole('button', {name: buttonLabel.menu});
    cy.log('Search role for search button');
    cy.findByRole('search').findByRole('button', {name: buttonLabel.search});
    // TODO #465: Put back the save place button
    // cy.log('Region role for save button');
    // cy.findByRole('region', {name: 'controls'}).findByRole('button', {
    //   name: buttonLabel.save,
    // });
    cy.log('Region role for locator button');
    cy.findByRole('region', {name: 'controls'}).findByRole('button', {
      name: buttonLabel.locator.default,
    });
  });
});
