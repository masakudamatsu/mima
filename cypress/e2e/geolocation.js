import {
  buttonLabel,
  geolocationNotSupported,
  geolocationPermissionDenied,
  geolocationPositionUnavailable,
} from '../../src/utils/uiCopies';

describe('Geolocation API happy path', () => {
  const coords = {
    latitude: 35.011565,
    longitude: 135.768326,
    accuracy: 15,
  };
  beforeEach(() => {
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
      cy.findByRole('img', {name: `You are here!`}).should('not.exist');
      // execute
      cy.findByRole('button', {name: buttonLabel.locator.default}).click();
      // verify
      cy.findByRole('img', {name: `You are here!`, timeout: 20000}).should(
        'be.visible',
      );
    });
    it.skip(`shows user's current moving direction`, () => {
      // requires visual testing; see snapshot-geolocation.js
    });
    it.skip(`shows error range of user's current location`, () => {
      // requires visual testing; see snapshot-geolocation.js
    });
  });
  describe('after panning the map and clicking the button again', () => {
    it.skip(`shows user location at the center of the screen`, () => {
      // requires visual testing; see snapshot-geolocation.js
    });
  });
});

describe('Geolocation API unsupported', () => {
  beforeEach(() => {
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
  it.skip('Pressing Tab key keeps the focus on close button', () => {
    // This test sometimes works, sometimes doesn't...
    cy.focused().tab();
    // https://docs.cypress.io/api/commands/type#Tabbing
    cy.focused().click();
    // verify
    cy.findByText(geolocationNotSupported.what).should('not.be.visible');
    cy.findByText(geolocationNotSupported.why).should('not.be.visible');
    cy.findByText(geolocationNotSupported.how).should('not.be.visible');
    cy.findByRole('button', {name: buttonLabel.locator.default}).should(
      'be.visible',
    );
  });
  it.skip('Pressing Shift + Tab key keeps the focus on close button', () => {
    // This test sometimes works, sometimes doesn't...
    cy.focused().tab({
      shift: true,
    });
    // https://docs.cypress.io/api/commands/type#Tabbing
    cy.focused().click();
    // verify
    cy.findByText(geolocationNotSupported.what).should('not.be.visible');
    cy.findByText(geolocationNotSupported.why).should('not.be.visible');
    cy.findByText(geolocationNotSupported.how).should('not.be.visible');
    cy.findByRole('button', {name: buttonLabel.locator.default}).should(
      'be.visible',
    );
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
  it('Pressing Esc key dismisses the dialog and focuses the locator button', () => {
    cy.get('body').type('{esc}');
    // verify
    cy.findByText(geolocationNotSupported.what).should('not.be.visible');
    cy.findByText(geolocationNotSupported.why).should('not.be.visible');
    cy.findByText(geolocationNotSupported.how).should('not.be.visible');
    cy.findByRole('button', {name: buttonLabel.locator.default}).should(
      'be.visible',
    );
    cy.focused().should('have.attr', 'data-testid', 'locator-button');
  });
});

describe('Geolocation API permission denied', () => {
  beforeEach(() => {
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
  it.skip('Pressing Tab key keeps the focus on close button', () => {
    // This test sometimes works, sometimes doesn't...
    cy.focused().tab();
    // https://docs.cypress.io/api/commands/type#Tabbing
    cy.focused().click();
    // verify
    cy.findByText(geolocationPermissionDenied.what).should('not.be.visible');
    cy.findByText(geolocationPermissionDenied.why).should('not.be.visible');
    cy.findByText(geolocationPermissionDenied.how).should('not.be.visible');
    cy.findByRole('button', {name: buttonLabel.locator.default}).should(
      'be.visible',
    );
  });
  it.skip('Pressing Shift + Tab key keeps the focus on close button', () => {
    // This test sometimes works, sometimes doesn't...
    cy.focused().tab({
      shift: true,
    });
    // https://docs.cypress.io/api/commands/type#Tabbing
    cy.focused().click();
    // verify
    cy.findByText(geolocationPermissionDenied.what).should('not.be.visible');
    cy.findByText(geolocationPermissionDenied.why).should('not.be.visible');
    cy.findByText(geolocationPermissionDenied.how).should('not.be.visible');
    cy.findByRole('button', {name: buttonLabel.locator.default}).should(
      'be.visible',
    );
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
  it('Pressing Esc key dismisses the dialog and focuses the locator button', () => {
    cy.get('body').type('{esc}');
    // verify
    cy.findByText(geolocationPermissionDenied.what).should('not.be.visible');
    cy.findByText(geolocationPermissionDenied.why).should('not.be.visible');
    cy.findByText(geolocationPermissionDenied.how).should('not.be.visible');
    cy.findByRole('button', {name: buttonLabel.locator.default}).should(
      'be.visible',
    );
    cy.focused().should('have.attr', 'data-testid', 'locator-button');
  });
});

describe('Geolocation API fails to find user location', () => {
  beforeEach(() => {
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
  it.skip(`Pressing Tab key focuses on "${geolocationPositionUnavailable.button.primary}" button`, () => {
    // This test sometimes works, sometimes doesn't...
    cy.focused().tab();
    // https://docs.cypress.io/api/commands/type#Tabbing
    cy.focused().click();
    // verify
    cy.get('@getCurrentPosition').should('have.been.calledTwice'); // see https://glebbahmutov.com/blog/cypress-tips-and-tricks/#control-navigatorlanguage
  });
  it.skip(`Pressing Shift + Tab key focuses on "${geolocationPositionUnavailable.button.primary}" button`, () => {
    // This test sometimes works, sometimes doesn't...
    cy.focused().tab({
      shift: true,
    });
    // https://docs.cypress.io/api/commands/type#Tabbing
    cy.focused().click();
    // verify
    cy.get('@getCurrentPosition').should('have.been.calledTwice'); // see https://glebbahmutov.com/blog/cypress-tips-and-tricks/#control-navigatorlanguage
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
  it.skip(`Pressing Tab key on "${geolocationPositionUnavailable.button.primary}" button moves the focus on "${geolocationPositionUnavailable.button.secondary}" button`, () => {
    // This test sometimes works, sometimes doesn't...
    cy.findByRole('button', {
      name: geolocationPositionUnavailable.button.primary,
    }).tab();
    // https://docs.cypress.io/api/commands/type#Tabbing
    cy.focused().click();
    // verify
    cy.findByText(geolocationPositionUnavailable.what).should('not.be.visible');
    cy.findByText(geolocationPositionUnavailable.why).should('not.be.visible');
    cy.findByText(geolocationPositionUnavailable.how).should('not.be.visible');
    cy.findByRole('button', {name: buttonLabel.locator.default}).should(
      'be.visible',
    );
  });
  it.skip(`Pressing Shift + Tab key on "${geolocationPositionUnavailable.button.primary}" button moves the focus on "${geolocationPositionUnavailable.button.secondary}" button`, () => {
    // This test sometimes works, sometimes doesn't...
    cy.findByRole('button', {
      name: geolocationPositionUnavailable.button.primary,
    }).tab({
      shift: true,
    });
    // https://docs.cypress.io/api/commands/type#Tabbing
    cy.focused().click();
    // verify
    cy.findByText(geolocationPositionUnavailable.what).should('not.be.visible');
    cy.findByText(geolocationPositionUnavailable.why).should('not.be.visible');
    cy.findByText(geolocationPositionUnavailable.how).should('not.be.visible');
    cy.findByRole('button', {name: buttonLabel.locator.default}).should(
      'be.visible',
    );
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
  it('Pressing Esc key dismisses the dialog and focuses the locator button', () => {
    cy.get('body').type('{esc}');
    // verify
    cy.findByText(geolocationPositionUnavailable.what).should('not.be.visible');
    cy.findByText(geolocationPositionUnavailable.why).should('not.be.visible');
    cy.findByText(geolocationPositionUnavailable.how).should('not.be.visible');
    cy.findByRole('button', {name: buttonLabel.locator.default}).should(
      'be.visible',
    );
    cy.focused().should('have.attr', 'data-testid', 'locator-button');
  });
});
