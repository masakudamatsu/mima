import {index} from '../../src/utils/metadata';

const {mockUser2} = require('../../test/utils/mockUsers');
const mockUserId = mockUser2.userId;

describe('Index page', () => {
  beforeEach(() => {
    cy.log('**Setting mock user session token**');
    cy.loginWithCookie({userId: mockUserId});
    cy.visit('/');
  });
  it('shows the page title in the browser tab', () => {
    cy.title().should('eq', index.title);
  });
  it('lets search enginges see the description', () => {
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      index.description,
    );
  });
});
