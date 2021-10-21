import {
  locatorButtonLabel,
  geolocationNotSupported,
  geolocationPermissionDenied,
  geolocationPositionUnavailable,
  geolocationTimedOut,
} from '../../src/utils/uiCopies';

describe('Geolocation API unsupported', () => {
  beforeEach(() => {
    cy.clock(Date.UTC(2021, 8, 28, 6), ['Date']); // https://docs.cypress.io/api/commands/clock#Function-names
    cy.visit('/', {
      onBeforeLoad(window) {
        Object.defineProperty(window.navigator, 'geolocation', {
          value: undefined,
        });
      },
    });
    cy.contains('Map Data', {timeout: 20000}); // Bottom-right text to be rendered in Google Maps
    // execute
    cy.findByRole('button', {name: locatorButtonLabel.default}).click();
  });
  it('Clicking locator button shows a dialog', () => {
    // verify
    cy.findByText(geolocationNotSupported.what).should('be.visible');
    cy.findByText(geolocationNotSupported.why).should('be.visible');
    cy.findByText(geolocationNotSupported.how).should('be.visible');
  });
  it(`Clicking the "${geolocationNotSupported.button}" button dismisses the dialog`, () => {
    // execute
    cy.findByRole('button', {name: geolocationNotSupported.button}).click();
    // verify
    cy.findByText(geolocationNotSupported.what).should('not.exist');
    cy.findByText(geolocationNotSupported.why).should('not.exist');
    cy.findByText(geolocationNotSupported.how).should('not.exist');
    cy.findByRole('button', {name: locatorButtonLabel.default}).should(
      'be.visible',
    );
  });
});

describe('Geolocation API permission denied', () => {
  beforeEach(() => {
    cy.clock(Date.UTC(2021, 8, 28, 6), ['Date']); // https://docs.cypress.io/api/commands/clock#Function-names
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
    cy.contains('Map Data', {timeout: 20000}); // Bottom-right text to be rendered in Google Maps
    // execute
    cy.findByRole('button', {name: locatorButtonLabel.default}).click();
  });
  it('Clicking locator button shows a dialog', () => {
    // verify
    cy.findByText(geolocationPermissionDenied.what).should('be.visible');
    cy.findByText(geolocationPermissionDenied.why).should('be.visible');
    cy.findByText(geolocationPermissionDenied.how).should('be.visible');
  });
  it(`Clicking the "${geolocationPermissionDenied.button}" button dismisses the dialog`, () => {
    // execute
    cy.findByRole('button', {name: geolocationPermissionDenied.button}).click();
    // verify
    cy.findByText(geolocationPermissionDenied.what).should('not.exist');
    cy.findByText(geolocationPermissionDenied.why).should('not.exist');
    cy.findByText(geolocationPermissionDenied.how).should('not.exist');
    cy.findByRole('button', {name: locatorButtonLabel.default}).should(
      'be.visible',
    );
  });
});

describe('Geolocation API fails to find user location', () => {
  beforeEach(() => {
    cy.clock(Date.UTC(2021, 8, 28, 6), ['Date']); // https://docs.cypress.io/api/commands/clock#Function-names
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
    cy.contains('Map Data', {timeout: 20000}); // Bottom-right text to be rendered in Google Maps
    // execute
    cy.findByRole('button', {name: locatorButtonLabel.default}).click();
  });
  it('Clicking locator button shows a dialog', () => {
    // verify
    cy.findByText(geolocationPositionUnavailable.what).should('be.visible');
    cy.findByText(geolocationPositionUnavailable.why).should('be.visible');
    cy.findByText(geolocationPositionUnavailable.how).should('be.visible');
  });
  it(`Clicking the "${geolocationPositionUnavailable.button.primary}" button executes Geolocation API once again`, () => {
    // verify
    cy.get('@getCurrentPosition').should('have.been.calledOnce'); // see https://glebbahmutov.com/blog/cypress-tips-and-tricks/#control-navigatorlanguage
    // execute
    cy.findByRole('button', {
      name: geolocationPositionUnavailable.button.primary,
    }).click();
    // verify
    cy.get('@getCurrentPosition').should('have.been.calledTwice'); // see https://glebbahmutov.com/blog/cypress-tips-and-tricks/#control-navigatorlanguage
  });
  it(`Clicking the "${geolocationPositionUnavailable.button.secondary}" button dismisses the dialog`, () => {
    // execute
    cy.findByRole('button', {
      name: geolocationPositionUnavailable.button.secondary,
    }).click();
    // verify
    cy.findByText(geolocationPositionUnavailable.what).should('not.exist');
    cy.findByText(geolocationPositionUnavailable.why).should('not.exist');
    cy.findByText(geolocationPositionUnavailable.how).should('not.exist');
    cy.findByRole('button', {name: locatorButtonLabel.default}).should(
      'be.visible',
    );
  });
});

describe('Geolocation API times out', () => {
  beforeEach(() => {
    cy.clock(Date.UTC(2021, 8, 28, 6), ['Date']); // https://docs.cypress.io/api/commands/clock#Function-names
    cy.visit('/', {
      onBeforeLoad(window) {
        cy.stub(
          window.navigator.geolocation,
          'getCurrentPosition',
          (success, error) => {
            throw error({code: 3});
          },
        ).as('getCurrentPosition');
      },
    });
    cy.contains('Map Data', {timeout: 20000}); // Bottom-right text to be rendered in Google Maps
    // execute
    cy.findByRole('button', {name: locatorButtonLabel.default}).click();
  });
  it('Clicking locator button shows a dialog', () => {
    // verify
    cy.findByText(geolocationTimedOut.what).should('be.visible');
    cy.findByText(geolocationTimedOut.why).should('be.visible');
    cy.findByText(geolocationTimedOut.how).should('be.visible');
  });
  it(`Clicking the "${geolocationTimedOut.button.primary}" button executes Geolocation API once again`, () => {
    // verify
    cy.get('@getCurrentPosition').should('have.been.calledOnce'); // see https://glebbahmutov.com/blog/cypress-tips-and-tricks/#control-navigatorlanguage
    // execute
    cy.findByRole('button', {
      name: geolocationTimedOut.button.primary,
    }).click();
    // verify
    cy.get('@getCurrentPosition').should('have.been.calledTwice'); // see https://glebbahmutov.com/blog/cypress-tips-and-tricks/#control-navigatorlanguage
  });
  it(`Clicking the "${geolocationTimedOut.button.secondary}" button dismisses the dialog`, () => {
    // execute
    cy.findByRole('button', {
      name: geolocationTimedOut.button.secondary,
    }).click();
    // verify
    cy.findByText(geolocationTimedOut.what).should('not.exist');
    cy.findByText(geolocationTimedOut.why).should('not.exist');
    cy.findByText(geolocationTimedOut.how).should('not.exist');
    cy.findByRole('button', {name: locatorButtonLabel.default}).should(
      'be.visible',
    );
  });
});
