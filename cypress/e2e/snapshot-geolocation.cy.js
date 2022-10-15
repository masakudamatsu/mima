import {buttonLabel} from '../../src/utils/uiCopies';
import {dimension} from '../../src/utils/designtokens';

const errorUIbreakpoints = [
  Number(dimension.breakpoint.divPopup.padding.slice(0, -2)),
];

const {mockUser2} = require('../../test/utils/mockUsers');
const mockUserId = mockUser2.userId;
describe('After clicking the location button', () => {
  const initialLat = 35.011565;
  const initialLng = 135.768326;
  const oneMeterInDegree = 1 / 111000; // 1 degree = 111km https://www.usna.edu/Users/oceano/pguth/md_help/html/approx_equivalents.htm
  beforeEach(() => {
    cy.log('**Setting mock user session token**');
    cy.loginWithCookie({userId: mockUserId});
    cy.visitAtDaytime('/');
    cy.waitForMapToLoad();
  });
  it('Shows current location with flight icon heading south and 15m accuracy circle', () => {
    // setup (mock current locations)
    cy.mockGetCurrentPosition({
      latitude: initialLat,
      longitude: initialLng,
    });
    cy.mockWatchPosition({
      latitude: initialLat - oneMeterInDegree, // moving southwards
      longitude: initialLng,
      accuracy: 15,
    });
    // execute
    cy.findByRole('button', {name: buttonLabel.locator.default}).click();
    // verify
    cy.waitForUserLocationToBeMarked();
    cy.percySnapshot('current-location-heading-south-more-accurate', {
      widths: [320, 768, 1024],
    });
  });
  it('Shows current location with flight icon heading west and 30m accuracy circle', () => {
    // setup (mock current locations)
    cy.mockGetCurrentPosition({latitude: initialLat, longitude: initialLng}); // this needs to be run after cy.visit(). Source: https://github.com/cypress-io/cypress/issues/2671#issuecomment-780721234
    cy.mockWatchPosition({
      latitude: initialLat,
      longitude: initialLng - oneMeterInDegree, // moving westward
      accuracy: 30,
    }); // this needs to be run after cy.visit(). Source: https://github.com/cypress-io/cypress/issues/2671#issuecomment-780721234
    // execute
    cy.findByRole('button', {name: buttonLabel.locator.default}).click();
    // verify
    cy.waitForUserLocationToBeMarked();
    cy.percySnapshot('current-location-heading-west-less-accurate', {
      widths: [320, 768, 1024],
    });
  });
});

describe('Once user location is being watched', () => {
  const coords = {
    latitude: 35.011565,
    longitude: 135.768326,
    accuracy: 15,
  };
  beforeEach(() => {
    cy.log('**Setting mock user session token**');
    cy.loginWithCookie({userId: mockUserId});
    cy.visitAtDaytime('/');
    cy.mockGetCurrentPosition(coords);
    cy.mockWatchPosition(coords);
    cy.waitForMapToLoad();
    // execute
    cy.findByRole('button', {name: buttonLabel.locator.default}).click();
    cy.waitForUserLocationToBeMarked();
  });
  it('Clicking locator button again after panning the map will show user location again', () => {
    // execute
    cy.swipeScreenRightToLeft();
    cy.findByRole('button', {name: buttonLabel.locator.activated}).click();
    // verify
    cy.percySnapshot('current-location-once-activated', {
      widths: [320, 768, 1024],
    });
  });
});

const errorCodes = [1, 2];
errorCodes.forEach(errorCode => {
  describe(`Geolocation API error code: ${errorCode}`, () => {
    beforeEach(() => {
      cy.log('**Setting mock user session token**');
      cy.loginWithCookie({userId: mockUserId});
    });
    it('Clicking the locator button pops up a light-mode dialog at daytime', () => {
      cy.clock(Date.UTC(2021, 8, 28, 6), ['Date']); // https://docs.cypress.io/api/commands/clock#Function-names
      cy.visit('/', {
        onBeforeLoad(window) {
          cy.stub(
            window.navigator.geolocation,
            'getCurrentPosition',
            (success, error) => {
              throw error({code: errorCode});
            },
          );
        },
      });
      cy.waitForMapToLoad();
      // execute
      cy.findByRole('button', {name: buttonLabel.locator.default}).click();
      // verify
      cy.percySnapshot(`current-location-error-${errorCode}-daytime`, {
        widths: [320, ...errorUIbreakpoints, 768, 1024],
      });
    });
    it('Clicking the locator button pops up a dark-mode dialog at nighttime', () => {
      cy.clock(Date.UTC(2021, 8, 28, 18), ['Date']); // https://docs.cypress.io/api/commands/clock#Function-names
      cy.visit('/', {
        onBeforeLoad(window) {
          cy.stub(
            window.navigator.geolocation,
            'getCurrentPosition',
            (success, error) => {
              throw error({code: errorCode});
            },
          );
        },
      });
      cy.waitForMapToLoad();
      // execute
      cy.findByRole('button', {name: buttonLabel.locator.default}).click();
      // verify
      cy.percySnapshot(`current-location-error-${errorCode}-nighttime`, {
        widths: [320, ...errorUIbreakpoints, 768, 1024],
      });
    });
  });
});

describe('Geolocation API unsupported', () => {
  beforeEach(() => {
    cy.log('**Setting mock user session token**');
    cy.loginWithCookie({userId: mockUserId});
  });
  it('Clicking the locator button pops up a light-mode dialog at daytime', () => {
    cy.clock(Date.UTC(2021, 8, 28, 6), ['Date']); // https://docs.cypress.io/api/commands/clock#Function-names
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
    // verify
    cy.percySnapshot(`current-location-not-supported-daytime`, {
      widths: [320, ...errorUIbreakpoints, 768, 1024],
    });
  });
  it('Clicking the locator button pops up a dark-mode dialog at nighttime', () => {
    cy.clock(Date.UTC(2021, 8, 28, 18), ['Date']); // https://docs.cypress.io/api/commands/clock#Function-names
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
    // verify
    cy.percySnapshot(`current-location-not-supported-nighttime`, {
      widths: [320, ...errorUIbreakpoints, 768, 1024],
    });
  });
});
