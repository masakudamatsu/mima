import {map} from '../../src/utils/designtokens';

describe('While loading the map', () => {
  beforeEach(() => {
    cy.auth();
  });
  it('at daytime', () => {
    cy.clock(Date.UTC(2021, 8, 28, 6), ['Date']); // https://docs.cypress.io/api/commands/clock#Function-names
    cy.visit('/');
    cy.get('body').should('have.css', 'background-color', map.cityblocks.day);
  });
  it('at nighttime', () => {
    cy.clock(Date.UTC(2021, 8, 28, 18), ['Date']); // https://docs.cypress.io/api/commands/clock#Function-names
    cy.visit('/');
    cy.get('body').should('have.css', 'background-color', map.cityblocks.night);
  });
});
