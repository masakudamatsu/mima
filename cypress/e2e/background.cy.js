import {map} from '../../src/utils/designtokens';

const {mockUser2} = require('../../test/utils/mockUsers');
const mockUserId = mockUser2.userId;
describe('While loading the map', () => {
  beforeEach(() => {
    cy.log('**Setting mock user session token**');
    cy.loginWithCookie({userId: mockUserId});
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
