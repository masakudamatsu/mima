import {
  locatorButtonLabel,
  geolocationNotSupported,
  geolocationPermissionDenied,
  dismissDialogButton,
} from '../../src/utils/uiCopies';

it('Geolocation API unsupported', () => {
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
  // verify
  cy.findByText(geolocationNotSupported.what).should('be.visible');
  cy.findByText(geolocationNotSupported.why).should('be.visible');
  cy.findByText(geolocationNotSupported.how).should('be.visible');
  // execute
  cy.findByRole('button', {name: dismissDialogButton}).click();
  // verify
  cy.findByText(geolocationNotSupported.what).should('not.exist');
  cy.findByText(geolocationNotSupported.why).should('not.exist');
  cy.findByText(geolocationNotSupported.how).should('not.exist');
  cy.findByRole('button', {name: locatorButtonLabel.default}).should(
    'be.visible',
  );
});

it('Geolocation API permission denied', () => {
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
  // verify
  cy.findByText(geolocationPermissionDenied.what).should('be.visible');
  cy.findByText(geolocationPermissionDenied.why).should('be.visible');
  cy.findByText(geolocationPermissionDenied.how).should('be.visible');
  // execute
  cy.findByRole('button', {name: dismissDialogButton}).click();
  // verify
  cy.findByText(geolocationPermissionDenied.what).should('not.exist');
  cy.findByText(geolocationPermissionDenied.why).should('not.exist');
  cy.findByText(geolocationPermissionDenied.how).should('not.exist');
  cy.findByRole('button', {name: locatorButtonLabel.default}).should(
    'be.visible',
  );
});
