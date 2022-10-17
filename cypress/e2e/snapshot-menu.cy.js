import {buttonLabel} from '../../src/utils/uiCopies';
import {dimension} from '../../src/utils/designtokens';

const menuUIbreakpoints = [
  Number(dimension.breakpoint.divPopup.padding.slice(0, -2)),
];

const {mockUser2} = require('../../test/utils/mockUsers');
const mockUserId = mockUser2.userId;
describe('Menu window', () => {
  beforeEach(() => {
    cy.log('Setting mock user session token');
    cy.loginWithCookie({userId: mockUserId});
  });
  it('Rendered in Light Mode at Daytime', () => {
    cy.visitAtDaytime('/');
    cy.waitForMapToLoad();
    cy.findByRole('button', {name: buttonLabel.menu}).click();
    cy.percySnapshot('menu-daytime', {
      widths: [320, ...menuUIbreakpoints, 768, 1024],
    });
  });
  it('Rendered in Dark Mode at Nighttime', () => {
    cy.visitAtNight('/');
    cy.waitForMapToLoad();
    cy.findByRole('button', {name: buttonLabel.menu}).click();
    cy.percySnapshot('menu-nighttime', {
      widths: [320, ...menuUIbreakpoints, 768, 1024],
    });
  });
});
