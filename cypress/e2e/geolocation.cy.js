import {
  buttonLabel,
  geolocationNotSupported,
  geolocationPermissionDenied,
  geolocationPositionUnavailable,
  userLocationMarkerLabel,
} from '../../src/utils/uiCopies';

describe('Geolocation feature: happy path', () => {
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
  it(`happy path with locator button`, () => {
    cy.log(`Initially, there's no place mark for current location`);
    cy.findByRole('img', {name: userLocationMarkerLabel}).should('not.exist');

    cy.log(`Clicking the locator button...`);
    cy.findByRole('button', {name: buttonLabel.locator.default}).click();

    // cy.log(`...blinks the locator button for a while`)
    // This cannot be tested with Cypress, it seems
    // Instead, LocatorButton.test.js checks if clicking the button toggles data-loading attribute so CSS animation gets applied

    cy.log(`...shows the user's current location`);
    cy.findByRole('img', {
      name: userLocationMarkerLabel,
      timeout: 20000,
    }).should('be.visible');

    cy.log(`...changes the locator button label`);
    cy.findByRole('button', {name: buttonLabel.locator.default}).should(
      'not.exist',
    );
    cy.findByRole('button', {
      name: buttonLabel.locator.activated,
      timeout: 20000,
    }).should('be.visible');

    cy.log(`Swiping the map and clicking the locator button again...`);
    cy.swipeScreenRightToLeft();
    cy.findByRole('img', {name: userLocationMarkerLabel}).should('be.hidden'); // verify the absence of the current location marker
    cy.findByRole('button', {name: buttonLabel.locator.activated}).click();

    cy.log(`...shows the current location again`);
    cy.findByRole('img', {
      name: userLocationMarkerLabel,
      timeout: 20000,
    }).should('be.visible');

    // cy.log(`...shows user's current moving direction`)
    // requires visual testing; see snapshot-geolocation.js

    // cy.log(`...shows the range of error in user's current location)
    // requires visual testing; see snapshot-geolocation.js
  });
  it(`happy path with ${buttonLabel.locator.default} button in the menu`, () => {
    cy.log(`Selecting "${buttonLabel.locator.default}" in the menu...`);
    cy.findByRole('button', {name: buttonLabel.menu}).click();
    cy.get('nav')
      .findAllByRole('button', {name: buttonLabel.locator.default})
      .click();

    cy.log(`...shows the user's current location`);
    cy.findByRole('img', {
      name: userLocationMarkerLabel,
      timeout: 20000,
    }).should('be.visible');

    cy.log(`...changes the locator button label`);
    cy.findByRole('button', {name: buttonLabel.locator.default}).should(
      'not.exist',
    );
    cy.findByRole('button', {
      name: buttonLabel.locator.activated,
      timeout: 20000,
    }).should('be.visible');

    cy.log(`...adds to the menu a button to snap to user location`);
    // unable to test because we're unsure how to mock watchPosition(), with watchID returned
    // // setting up
    // cy.swipeScreenRightToLeft();
    // cy.findByRole('img', {name: userLocationMarkerLabel}).should('be.hidden');
    // // execute
    // cy.findByRole('button', {name: buttonLabel.menu}).click();
    // // verify
    // cy.findByRole('button', {name: buttonLabel.locator.activated}).click();
    // cy.findByRole('img', {
    //   name: userLocationMarkerLabel,
    //   timeout: 20000,
    // }).should('be.visible');

    cy.log(`...adds to the menu a button to stop tracking user location`);
    // unable to test because we're unsure how to mock watchPosition(), with watchID returned
    // cy.findByRole('button', {name: buttonLabel.menu}).click();
    // cy.findByRole('button', {name: buttonLabel.locator.deactivate}).click();
    // cy.findByRole('img', {name: userLocationMarkerLabel}).should('not.exist');
    // cy.findByRole('button', {name: buttonLabel.locator.default}).should(
    //   'be.visible',
    // );
  });
  it.skip('switching to another tab stops tracking after 10 seconds', () => {
    // unable to test because we're unsure how to mock Page Visibility API
  });
});

describe('Geolocation feature: sad paths', () => {
  it('Geolocation API not supported', () => {
    cy.log(`Setting up`);
    cy.visit('/', {
      onBeforeLoad(window) {
        Object.defineProperty(window.navigator, 'geolocation', {
          value: undefined,
        });
      },
    });
    cy.waitForMapToLoad();

    cy.log(`Clicking locator button...`);
    cy.findByRole('button', {name: buttonLabel.locator.default}).click();

    cy.log(`...shows an error dialog`);
    cy.findByText(geolocationNotSupported.what).should('be.visible');
    cy.findByText(geolocationNotSupported.why).should('be.visible');
    cy.findByText(geolocationNotSupported.how).should('be.visible');
    cy.findByRole('button', {name: geolocationNotSupported.button}).should(
      'be.visible',
    );

    cy.log(`...focuses the button to close the dialog`);
    cy.focused().should('have.attr', 'data-testid', 'close-button-unsupported');

    cy.log(`Pressing Tab key keeps the focus on the close button`);
    cy.realPress('Tab'); // https://github.com/dmtrKovalenko/cypress-real-events#cyrealpress
    cy.focused().should('have.attr', 'data-testid', 'close-button-unsupported');

    cy.log(`Pressing Shift + Tab key keeps the focus on close button`);
    cy.realPress(['Shift', 'Tab']);
    cy.focused().should('have.attr', 'data-testid', 'close-button-unsupported');

    cy.log(`Pressing ESC key...`);
    cy.get('body').type('{esc}');
    cy.log(`...DOES NOT dismiss the dialog`);
    cy.findByText(geolocationNotSupported.what).should('be.visible');
    cy.findByText(geolocationNotSupported.why).should('be.visible');
    cy.findByText(geolocationNotSupported.how).should('be.visible');
    cy.findByRole('button', {name: geolocationNotSupported.button}).should(
      'be.visible',
    );

    cy.log(`Clicking the close button...`);
    cy.findByRole('button', {name: geolocationNotSupported.button}).click();
    cy.log(`...dismisses the dialog`);
    cy.findByText(geolocationNotSupported.what).should('not.be.visible');
    cy.findByText(geolocationNotSupported.why).should('not.be.visible');
    cy.findByText(geolocationNotSupported.how).should('not.be.visible');
    cy.log(`...shows and focuses the locator button`);
    cy.findByRole('button', {name: buttonLabel.locator.default}).should(
      'be.visible',
    );
    cy.focused().should('have.attr', 'data-testid', 'locator-button');
  });
  it('Geolocation API permission denied', () => {
    cy.log(`Setting up`);
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

    cy.log(`Clicking locator button...`);
    cy.findByRole('button', {name: buttonLabel.locator.default}).click();

    cy.log(`...shows the error dialog`);
    cy.findByText(geolocationPermissionDenied.what).should('be.visible');
    cy.findByText(geolocationPermissionDenied.why).should('be.visible');
    cy.findByText(geolocationPermissionDenied.how).should('be.visible');
    cy.findByRole('button', {name: geolocationPermissionDenied.button}).should(
      'be.visible',
    );

    cy.log(`...focuses the close button`);
    cy.focused().should('have.attr', 'data-testid', 'close-button-denied');

    cy.log(`Pressing Tab key...`);
    cy.realPress('Tab');
    cy.log(`...keeps the focus on close button`);
    cy.focused().should('have.attr', 'data-testid', 'close-button-denied');

    cy.log(`Pressing Shift+Tab key...`);
    cy.realPress(['Shift', 'Tab']);
    cy.log(`...keeps the focus on close button`);
    cy.focused().should('have.attr', 'data-testid', 'close-button-denied');

    cy.log(`Pressing Esc key...`);
    cy.get('body').type('{esc}');
    cy.log(`...DOES NOT dismiss the dialog`);
    cy.findByText(geolocationPermissionDenied.what).should('be.visible');
    cy.findByText(geolocationPermissionDenied.why).should('be.visible');
    cy.findByText(geolocationPermissionDenied.how).should('be.visible');
    cy.findByRole('button', {name: geolocationPermissionDenied.button}).should(
      'be.visible',
    );

    cy.log(`Clicking the "${geolocationPermissionDenied.button}" button...`);
    cy.findByRole('button', {name: geolocationPermissionDenied.button}).click();
    cy.log(`...dismisses the dialog`);
    cy.findByText(geolocationPermissionDenied.what).should('not.be.visible');
    cy.findByText(geolocationPermissionDenied.why).should('not.be.visible');
    cy.findByText(geolocationPermissionDenied.how).should('not.be.visible');
    cy.log(`...focuses the locator button`);
    cy.findByRole('button', {name: buttonLabel.locator.default}).should(
      'be.visible',
    );
    cy.focused().should('have.attr', 'data-testid', 'locator-button');
  });
  it('Geolocation API fails to find user location', () => {
    cy.log(`Setting up`);
    cy.visit('/', {
      onBeforeLoad(window) {
        cy.stub(window.navigator.geolocation, 'getCurrentPosition')
          .callsFake((success, error) => {
            throw error({code: 2});
          })
          .as('getCurrentPosition');
      },
    });
    cy.waitForMapToLoad();
    cy.log(`Clicking locator button...`);
    cy.findByRole('button', {name: buttonLabel.locator.default}).click();

    cy.log(`...shows the error dialog`);
    cy.findByText(geolocationPositionUnavailable.what).should('be.visible');
    cy.findByText(geolocationPositionUnavailable.why).should('be.visible');
    cy.findByText(geolocationPositionUnavailable.how).should('be.visible');
    cy.findByRole('button', {
      name: geolocationPositionUnavailable.button.primary,
    }).should('be.visible');
    cy.findByRole('button', {
      name: geolocationPositionUnavailable.button.secondary,
    }).should('be.visible');

    cy.log(`...focuses the close button`);
    cy.focused().should('have.attr', 'data-testid', 'close-button-unavailable');

    cy.log(`Pressing Tab key...`);
    cy.realPress('Tab');
    cy.log(
      `...focuses "${geolocationPositionUnavailable.button.primary}" button`,
    );
    cy.focused().should(
      'have.attr',
      'data-testid',
      'primary-button-unavailable',
    );

    cy.log(`Pressing Tab key once more...`);
    cy.realPress('Tab');
    cy.log(
      `...focuses "${geolocationPositionUnavailable.button.secondary}" button`,
    );
    cy.focused().should('have.attr', 'data-testid', 'close-button-unavailable');

    cy.log(`Pressing Shift+Tab key...`);
    cy.realPress(['Shift', 'Tab']);
    cy.log(
      `...focuses "${geolocationPositionUnavailable.button.primary}" button`,
    );
    cy.focused().should(
      'have.attr',
      'data-testid',
      'primary-button-unavailable',
    );

    cy.log(`Pressing Shift+Tab key once more...`);
    cy.realPress(['Shift', 'Tab']);
    cy.log(
      `...focuses "${geolocationPositionUnavailable.button.secondary}" button`,
    );
    cy.focused().should('have.attr', 'data-testid', 'close-button-unavailable');

    cy.log(`Pressing Esc key...`);
    cy.get('body').type('{esc}');
    cy.log(`...DOES NOT dismiss the dialog`);
    cy.findByText(geolocationPositionUnavailable.what).should('be.visible');
    cy.findByText(geolocationPositionUnavailable.why).should('be.visible');
    cy.findByText(geolocationPositionUnavailable.how).should('be.visible');
    cy.findByRole('button', {
      name: geolocationPositionUnavailable.button.primary,
    }).should('be.visible');
    cy.findByRole('button', {
      name: geolocationPositionUnavailable.button.secondary,
    }).should('be.visible');

    cy.log(
      `Clicking "${geolocationPositionUnavailable.button.primary}" button executes Geolocation API once again`,
    );
    // verify initial condition (it's been called once)
    cy.get('@getCurrentPosition').should('have.been.calledOnce'); // see https://glebbahmutov.com/blog/cypress-tips-and-tricks/#control-navigatorlanguage
    // execute
    cy.findByRole('button', {
      name: geolocationPositionUnavailable.button.primary,
    }).click();
    // verify
    cy.get('@getCurrentPosition').should('have.been.calledTwice'); // see https://glebbahmutov.com/blog/cypress-tips-and-tricks/#control-navigatorlanguage

    cy.log(
      `Clicking the "${geolocationPositionUnavailable.button.secondary}" button...`,
    );
    cy.findByRole('button', {
      name: geolocationPositionUnavailable.button.secondary,
    }).click();
    cy.log(`...dismisses the dialog`);
    cy.findByText(geolocationPositionUnavailable.what).should('not.be.visible');
    cy.findByText(geolocationPositionUnavailable.why).should('not.be.visible');
    cy.findByText(geolocationPositionUnavailable.how).should('not.be.visible');
    cy.log(`...focuses the locator button`);
    cy.findByRole('button', {name: buttonLabel.locator.default}).should(
      'be.visible',
    );
    cy.focused().should('have.attr', 'data-testid', 'locator-button');
  });
});
