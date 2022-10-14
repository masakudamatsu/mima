import {
  buttonLabel,
  geolocationNotSupported,
  geolocationPermissionDenied,
  geolocationPositionUnavailable,
  userLocationMarkerLabel,
} from '../../src/utils/uiCopies';

const {mockUser2} = require('../../test/utils/mockUsers');
const mockUserId = mockUser2.userId;

describe('Geolocation API happy path', () => {
  const coords = {
    latitude: 35.011565,
    longitude: 135.768326,
    accuracy: 15,
  };
  beforeEach(() => {
    cy.log('**Setting mock user session token**');
    cy.loginWithCookie({userId: mockUserId});
    cy.visit('/');
    cy.mockGetCurrentPosition(coords);
    cy.mockWatchPosition(coords);
    cy.waitForMapToLoad();
  });
  describe('after clicking locator button', () => {
    it.skip(`blinks the locator button until user's current location is shown`, () => {
      // This cannot be tested with Cypress, it seems
      // Instead, LocatorButton.test.js checks if clicking the button toggles data-loading attribute so CSS animation gets applied
    });
    it(`changes the button label`, () => {
      // execute
      cy.findByRole('button', {name: buttonLabel.locator.default}).click();
      // verify
      cy.findByRole('button', {name: buttonLabel.locator.default}).should(
        'not.exist',
      );
      cy.findByRole('button', {
        name: buttonLabel.locator.activated,
        timeout: 20000,
      }).should('be.visible');
    });
    it(`shows user's current location`, () => {
      // verify initial state
      cy.findByRole('img', {name: userLocationMarkerLabel}).should('not.exist');
      // execute
      cy.findByRole('button', {name: buttonLabel.locator.default}).click();
      // verify
      cy.findByRole('img', {
        name: userLocationMarkerLabel,
        timeout: 20000,
      }).should('be.visible');
    });
    it.skip(`shows user's current moving direction`, () => {
      // requires visual testing; see snapshot-geolocation.js
    });
    it.skip(`shows error range of user's current location`, () => {
      // requires visual testing; see snapshot-geolocation.js
    });
  });
  describe('after panning the map and clicking the button again', () => {
    beforeEach(() => {
      cy.findByRole('button', {name: buttonLabel.locator.default}).click();
      cy.findByRole('img', {name: userLocationMarkerLabel}).should(
        'be.visible',
      );
    });
    it(`shows user location inside the screen`, () => {
      // setting up
      cy.swipeScreenRightToLeft();
      cy.findByRole('img', {name: userLocationMarkerLabel}).should('be.hidden');
      // execute
      cy.findByRole('button', {name: buttonLabel.locator.activated}).click();
      // verify
      cy.findByRole('img', {
        name: userLocationMarkerLabel,
        timeout: 20000,
      }).should('be.visible');
    });
  });
  describe('after clicking the button in the menu', () => {
    it(`shows user's current location`, () => {
      // execute
      cy.findByRole('button', {name: buttonLabel.menu}).click();
      cy.get('nav')
        .findAllByRole('button', {name: buttonLabel.locator.default})
        .click();
      // verify
      cy.findByRole('img', {
        name: userLocationMarkerLabel,
        timeout: 20000,
      }).should('be.visible');
    });
  });
  describe.skip('once user location is shown', () => {
    // we cannot test this case unless we can manage to mock watchPosition()
    beforeEach(() => {
      cy.findByRole('button', {name: buttonLabel.locator.default}).click();
      cy.findByRole('img', {
        name: userLocationMarkerLabel,
        timeout: 20000,
      }).should('be.visible');
    });
    it.skip('menu includes the button to snap to user location', () => {
      // unable to test because we're unsure how to mock watchPosition(), with watchID returned
      // setting up
      cy.swipeScreenRightToLeft();
      cy.findByRole('img', {name: userLocationMarkerLabel}).should('be.hidden');
      // execute
      cy.findByRole('button', {name: buttonLabel.menu}).click();
      // verify
      cy.findByRole('button', {name: buttonLabel.locator.activated}).click();
      cy.findByRole('img', {
        name: userLocationMarkerLabel,
        timeout: 20000,
      }).should('be.visible');
    });
    it.skip('menu includes the button to stop tracking', () => {
      // unable to test because we're unsure how to mock watchPosition(), with watchID returned
      // execute
      cy.findByRole('button', {name: buttonLabel.menu}).click();
      // verify
      cy.findByRole('button', {name: buttonLabel.locator.deactivate}).click();
      cy.findByRole('img', {name: userLocationMarkerLabel}).should('not.exist');
    });
    it.skip('switching to another tab stops tracking after 10 seconds', () => {
      // unable to test because we're unsure how to mock Page Visibility API
    });
  });
});

describe('Geolocation API unsupported', () => {
  beforeEach(() => {
    cy.log('**Setting mock user session token**');
    cy.loginWithCookie({userId: mockUserId});
    cy.visit('/', {
      onBeforeLoad(window) {
        Object.defineProperty(window.navigator, 'geolocation', {
          value: undefined,
        });
      },
    });
    cy.waitForMapToLoad();
    // execute
    cy.findByRole('button', {name: buttonLabel.locator.default}).click();
  });
  it('Clicking locator button shows a dialog', () => {
    // verify
    cy.findByText(geolocationNotSupported.what).should('be.visible');
    cy.findByText(geolocationNotSupported.why).should('be.visible');
    cy.findByText(geolocationNotSupported.how).should('be.visible');
  });
  it('Clicking locator button focuses close button', () => {
    cy.focused().should('have.attr', 'data-testid', 'close-button-unsupported');
  });
  it('Pressing Tab key keeps the focus on close button', () => {
    cy.realPress('Tab'); // https://github.com/dmtrKovalenko/cypress-real-events#cyrealpress
    cy.focused().should('have.attr', 'data-testid', 'close-button-unsupported');
  });
  it('Pressing Shift + Tab key keeps the focus on close button', () => {
    cy.realPress(['Shift', 'Tab']);
    // verify
    cy.focused().should('have.attr', 'data-testid', 'close-button-unsupported');
  });
  it(`Clicking the "${geolocationNotSupported.button}" button dismisses the dialog and focuses the locator button`, () => {
    // execute
    cy.findByRole('button', {name: geolocationNotSupported.button}).click();
    // verify
    cy.findByText(geolocationNotSupported.what).should('not.be.visible');
    cy.findByText(geolocationNotSupported.why).should('not.be.visible');
    cy.findByText(geolocationNotSupported.how).should('not.be.visible');
    cy.findByRole('button', {name: buttonLabel.locator.default}).should(
      'be.visible',
    );
    cy.focused().should('have.attr', 'data-testid', 'locator-button');
  });
  it('Pressing Esc key DOES NOT dismiss the dialog', () => {
    cy.get('body').type('{esc}');
    // verify
    cy.findByText(geolocationNotSupported.what).should('be.visible');
    cy.findByText(geolocationNotSupported.why).should('be.visible');
    cy.findByText(geolocationNotSupported.how).should('be.visible');
    cy.findByRole('button', {name: buttonLabel.locator.default}).should(
      'be.visible',
    );
  });
});

describe('Geolocation API permission denied', () => {
  beforeEach(() => {
    cy.log('**Setting mock user session token**');
    cy.loginWithCookie({userId: mockUserId});
    cy.visit('/', {
      onBeforeLoad(window) {
        cy.stub(
          window.navigator.geolocation,
          'getCurrentPosition',
          (success, error) => {
            throw error({code: 1});
          },
        );
      },
    });
    cy.waitForMapToLoad();
    // execute
    cy.findByRole('button', {name: buttonLabel.locator.default}).click();
  });
  it('Clicking locator button shows a dialog', () => {
    // verify
    cy.findByText(geolocationPermissionDenied.what).should('be.visible');
    cy.findByText(geolocationPermissionDenied.why).should('be.visible');
    cy.findByText(geolocationPermissionDenied.how).should('be.visible');
  });
  it('Clicking locator button focuses close button', () => {
    cy.focused().should('have.attr', 'data-testid', 'close-button-denied');
  });
  it('Pressing Tab key keeps the focus on close button', () => {
    cy.realPress('Tab');
    cy.focused().should('have.attr', 'data-testid', 'close-button-denied');
  });
  it('Pressing Shift + Tab key keeps the focus on close button', () => {
    cy.realPress(['Shift', 'Tab']);
    cy.focused().should('have.attr', 'data-testid', 'close-button-denied');
  });
  it(`Clicking the "${geolocationPermissionDenied.button}" button dismisses the dialog and focuses the locator button`, () => {
    // execute
    cy.findByRole('button', {name: geolocationPermissionDenied.button}).click();
    // verify
    cy.findByText(geolocationPermissionDenied.what).should('not.be.visible');
    cy.findByText(geolocationPermissionDenied.why).should('not.be.visible');
    cy.findByText(geolocationPermissionDenied.how).should('not.be.visible');
    cy.findByRole('button', {name: buttonLabel.locator.default}).should(
      'be.visible',
    );
    cy.focused().should('have.attr', 'data-testid', 'locator-button');
  });
  it('Pressing Esc key DOES NOT dismiss the dialog', () => {
    cy.get('body').type('{esc}');
    // verify
    cy.findByText(geolocationPermissionDenied.what).should('be.visible');
    cy.findByText(geolocationPermissionDenied.why).should('be.visible');
    cy.findByText(geolocationPermissionDenied.how).should('be.visible');
    cy.findByRole('button', {name: buttonLabel.locator.default}).should(
      'be.visible',
    );
  });
});

describe('Geolocation API fails to find user location', () => {
  beforeEach(() => {
    cy.log('**Setting mock user session token**');
    cy.loginWithCookie({userId: mockUserId});
    cy.visit('/', {
      onBeforeLoad(window) {
        cy.stub(
          window.navigator.geolocation,
          'getCurrentPosition',
          (success, error) => {
            throw error({code: 2});
          },
        ).as('getCurrentPosition');
      },
    });
    cy.waitForMapToLoad();
    // execute
    cy.findByRole('button', {name: buttonLabel.locator.default}).click();
  });
  it('Clicking locator button shows a dialog', () => {
    // verify
    cy.findByText(geolocationPositionUnavailable.what).should('be.visible');
    cy.findByText(geolocationPositionUnavailable.why).should('be.visible');
    cy.findByText(geolocationPositionUnavailable.how).should('be.visible');
  });
  it('Clicking locator button focuses close button', () => {
    cy.focused().should('have.attr', 'data-testid', 'close-button-unavailable');
  });
  it(`Pressing Tab key once will focus "${geolocationPositionUnavailable.button.primary}" button`, () => {
    cy.realPress('Tab');
    // verify
    cy.focused().should(
      'have.attr',
      'data-testid',
      'primary-button-unavailable',
    );
  });
  it(`Pressing Tab key twice will focus "${geolocationPositionUnavailable.button.secondary}" button`, () => {
    cy.realPress('Tab');
    cy.realPress('Tab');
    // verify
    cy.focused().should('have.attr', 'data-testid', 'close-button-unavailable');
  });
  it(`Pressing Shift + Tab key once will focus "${geolocationPositionUnavailable.button.primary}" button`, () => {
    cy.realPress(['Shift', 'Tab']);
    // verify
    cy.focused().should(
      'have.attr',
      'data-testid',
      'primary-button-unavailable',
    );
  });
  it(`Pressing Shift + Tab key twice will focus "${geolocationPositionUnavailable.button.secondary}" button`, () => {
    cy.realPress(['Shift', 'Tab']);
    cy.realPress(['Shift', 'Tab']);
    // verify
    cy.focused().should('have.attr', 'data-testid', 'close-button-unavailable');
  });
  it(`Clicking the "${geolocationPositionUnavailable.button.primary}" button executes Geolocation API once again`, () => {
    // verify initial condition (it's been called once)
    cy.get('@getCurrentPosition').should('have.been.calledOnce'); // see https://glebbahmutov.com/blog/cypress-tips-and-tricks/#control-navigatorlanguage
    // execute
    cy.findByRole('button', {
      name: geolocationPositionUnavailable.button.primary,
    }).click();
    // verify
    cy.get('@getCurrentPosition').should('have.been.calledTwice'); // see https://glebbahmutov.com/blog/cypress-tips-and-tricks/#control-navigatorlanguage
  });
  it(`Clicking the "${geolocationPositionUnavailable.button.secondary}" button dismisses the dialog and focuses the locator button`, () => {
    // execute
    cy.findByRole('button', {
      name: geolocationPositionUnavailable.button.secondary,
    }).click();
    // verify
    cy.findByText(geolocationPositionUnavailable.what).should('not.be.visible');
    cy.findByText(geolocationPositionUnavailable.why).should('not.be.visible');
    cy.findByText(geolocationPositionUnavailable.how).should('not.be.visible');
    cy.findByRole('button', {name: buttonLabel.locator.default}).should(
      'be.visible',
    );
    cy.focused().should('have.attr', 'data-testid', 'locator-button');
  });
  it('Pressing Esc key DOES NOT dismiss the dialog', () => {
    cy.get('body').type('{esc}');
    // verify
    cy.findByText(geolocationPositionUnavailable.what).should('be.visible');
    cy.findByText(geolocationPositionUnavailable.why).should('be.visible');
    cy.findByText(geolocationPositionUnavailable.how).should('be.visible');
    cy.findByRole('button', {name: buttonLabel.locator.default}).should(
      'be.visible',
    );
  });
});
