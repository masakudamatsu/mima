import {index} from '../../src/utils/metadata';

const {mockUser2} = require('../../test/utils/mockUsers');
const mockUserId = mockUser2.userId;

describe('Metadata', () => {
  beforeEach(() => {
    cy.log('Setting mock user session token');
    cy.loginWithCookie({userId: mockUserId});
  });
  it('index page', () => {
    cy.log(`Visiting the index page...`);
    cy.visit('/');
    cy.log(`...sets the page title`);
    cy.title().should('eq', index.title);
    cy.log(`...sets the page decription`);
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      index.description,
    );
  });
});
