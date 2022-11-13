import {
  buttonLabel,
  loginPage,
  renewalPage,
  signupPage,
  subscribePage,
} from '../../src/utils/uiCopies';

import {
  mockPlace1,
  mockPlace2,
  mockPlace3,
  mockPlace4,
  mockPlace5,
  mockPlace6,
  mockPlace7,
} from '../../test/utils/mockData';

describe('First-time users', () => {
  it('can start a trial by visiting the Signup page', () => {
    cy.visit('/signup');
    cy.findByText(signupPage.buttonLabel).then(link => {
      cy.wrap(link).should('have.attr', 'href', '/api/auth/signup');
      cy.request(link.prop('href')).its('status').should('eq', 200);
    });
  });
  // TODO #345: handle the case where first time users visit Login page
  // TODO #345: handle the case where first time users visit Subscribe page
  // TODO #345: handle the case where first time users visit App
});
describe('Logged-out users', () => {
  it('can log in by visiting the Signup page', () => {
    cy.visit('/signup');
    cy.findByText(loginPage.buttonLabel).then(link => {
      cy.wrap(link).should('have.attr', 'href', '/api/auth/login');
      cy.request(link.prop('href')).its('status').should('eq', 200);
    });
  });
  it('can log in by visiting the Login page', () => {
    cy.visit('/login');
    cy.findByText(loginPage.buttonLabel).then(link => {
      cy.wrap(link).should('have.attr', 'href', '/api/auth/login');
      cy.request(link.prop('href')).its('status').should('eq', 200);
    });
  });
  it('gets redirected from Subscribe page to Auth0 login form', () => {
    cy.intercept('GET', '/subscribe').as('subscribePage');
    cy.visit('/subscribe');
    cy.wait('@subscribePage').then(({response}) => {
      expect(response.statusCode).to.eq(307);
      expect(response.headers).to.have.deep.property(
        // API ref: https://docs.cypress.io/guides/references/assertions#BDD-Assertions
        'location',
        '/api/auth/login?returnTo=%2Fsubscribe',
      );
    });
  });
  it('gets redirected from the App to Auth0 login form', () => {
    cy.intercept('GET', '/').as('subscribePage');
    cy.visit('/');
    cy.wait('@subscribePage').then(({response}) => {
      expect(response.statusCode).to.eq(307);
      expect(response.headers).to.have.deep.property(
        // API ref: https://docs.cypress.io/guides/references/assertions#BDD-Assertions
        'location',
        '/api/auth/login?returnTo=%2F',
      );
    });
  });
});

describe('Logged-in users', () => {
  beforeEach(() => {
    cy.auth();
  });
  it('can log out from menu', () => {
    cy.intercept('GET', '/api/auth/logout').as('logout');
    cy.visit('/');
    cy.findByRole('button', {name: buttonLabel.menu}).click();
    cy.findByText(buttonLabel.logout).click();
    cy.wait('@logout').then(({response}) => {
      expect(response.statusCode).to.eq(302);
      expect(response.headers.location).to.match(
        /https:\/\/my-ideal-map.jp.auth0.com\/v2\/logout.*/i, // TODO #331: replace this url with our own Login page
      ); // API ref: https://docs.cypress.io/guides/references/assertions#BDD-Assertions
    });
  });
});

describe('Trial users', () => {
  beforeEach(() => {
    cy.auth('trial_user', {
      username: Cypress.env('auth0UserTrial'),
      password: Cypress.env('auth0PassTrial'),
    });
  });
  it('will not get redirected from signup page', () => {
    cy.visit('/signup');
    cy.url().should('eq', `${Cypress.config().baseUrl}/signup`);
  });
  it('get redirected from login page to the app', () => {
    cy.visit('/login');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
  it('gets directed from subscribe page to the app', () => {
    cy.visit('/subscribe');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
  it('can directly visit the app once logged in', () => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});

describe('Expired trial users', () => {
  beforeEach(() => {
    cy.auth('trial_expired_user', {
      username: Cypress.env('auth0UserTrialExpired'),
      password: Cypress.env('auth0PassTrialExpired'),
    });
  });
  it('will not get redirected from signup page', () => {
    cy.visit('/signup');
    cy.url().should('eq', `${Cypress.config().baseUrl}/signup`);
  });
  it('get redirected from login page to subscribe page', () => {
    cy.visit('/login');
    cy.url().should('eq', `${Cypress.config().baseUrl}/subscribe`);
  });
  it('can directly visit subscribe page', () => {
    cy.visit('/subscribe');
    cy.url().should('eq', `${Cypress.config().baseUrl}/subscribe`);
  });
  it('gets redirected from the app to subscribe page', () => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.config().baseUrl}/subscribe`);
  });
  it('can start subscription on subscribe page', () => {
    cy.intercept('POST', '/api/checkout_sessions').as('checkout');
    cy.visit('/subscribe');
    cy.findByRole('button', {name: subscribePage.offer.buttonLabel}).click();
    cy.wait('@checkout').then(({response}) => {
      expect(response.statusCode).to.eq(303);
      expect(response.headers.location).to.match(
        /https:\/\/checkout.stripe.com\/.*/i,
      ); // API ref: https://docs.cypress.io/guides/references/assertions#BDD-Assertions
    });
  });
  it('can log out on subscribe page', () => {
    // users may be using a shared PC and have to go before subscribing
    cy.intercept('GET', '/api/auth/logout').as('logout');
    cy.visit('/subscribe');
    cy.findByText(buttonLabel.logout).click();
    cy.wait('@logout').then(({response}) => {
      expect(response.statusCode).to.eq(302);
      expect(response.headers.location).to.match(
        /https:\/\/my-ideal-map.jp.auth0.com\/v2\/logout.*/i, // TODO #331: replace this url with our own Login page
      ); // API ref: https://docs.cypress.io/guides/references/assertions#BDD-Assertions
    });
  });
  it('can try again after canceling payment', () => {
    cy.intercept('POST', '/api/checkout_sessions').as('checkout');
    cy.visit('/subscribe?canceled=true');
    cy.findByRole('button', {name: subscribePage.canceled.buttonLabel}).click();
    cy.wait('@checkout').then(({response}) => {
      expect(response.statusCode).to.eq(303);
      expect(response.headers.location).to.match(
        /https:\/\/checkout.stripe.com\/.*/i,
      ); // API ref: https://docs.cypress.io/guides/references/assertions#BDD-Assertions
    });
  });
  it('can log out after canceling payment', () => {
    cy.intercept('GET', '/api/auth/logout').as('logout');
    cy.visit('/subscribe?canceled=true');
    cy.findByText(buttonLabel.logout).click();
    cy.wait('@logout').then(({response}) => {
      expect(response.statusCode).to.eq(302);
      expect(response.headers.location).to.match(
        /https:\/\/my-ideal-map.jp.auth0.com\/v2\/logout.*/i, // TODO #331: replace this url with our own Login page
      ); // API ref: https://docs.cypress.io/guides/references/assertions#BDD-Assertions
    });
  });
});

describe('Subscribed users', () => {
  beforeEach(() => {
    cy.auth();
  });
  it('can visit the app after successful payment', () => {
    cy.visit('/success');
    cy.findByText(subscribePage.success.buttonLabel).click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
  it('will not get redirected from signup page to the app', () => {
    cy.visit('/signup');
    cy.url().should('eq', `${Cypress.config().baseUrl}/signup`);
  });
  it('get redirected from login page to the app', () => {
    cy.visit('/login');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
  it('get redirected from subscribe page to the app', () => {
    cy.visit('/subscribe');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});

describe('Expired subscription users', () => {
  beforeEach(() => {
    cy.auth('subscription_expired_user', {
      username: Cypress.env('auth0UserSubscriptionExpired'),
      password: Cypress.env('auth0PassSubscriptionExpired'),
    });
  });
  it('gets redirected from the app to renewal page', () => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.config().baseUrl}/renewal`);
  });
  it('can renew subscription on renewal page', () => {
    cy.visit('/renewal');
    cy.findByText(renewalPage.offer.buttonLabel).then(link => {
      cy.wrap(link).should(
        'have.attr',
        'href',
        Cypress.env('customer_portal_url'),
      );
      cy.request(link.prop('href')).its('status').should('eq', 200);
    });
  });
  it('can log out', () => {
    cy.intercept('GET', '/api/auth/logout').as('logout');
    cy.visit('/renewal');
    cy.findByText(buttonLabel.logout).click();
    cy.wait('@logout').then(({response}) => {
      expect(response.statusCode).to.eq(302);
      expect(response.headers.location).to.match(
        /https:\/\/my-ideal-map.jp.auth0.com\/v2\/logout.*/i, // TODO #331: replace this url with our own Login page
      ); // API ref: https://docs.cypress.io/guides/references/assertions#BDD-Assertions
    });
  });
});

describe('Repeatedly failed payment users', () => {
  beforeEach(() => {
    cy.auth('unpaid_users', {
      username: Cypress.env('auth0UserUnpaid'),
      password: Cypress.env('auth0PassUnpaid'),
    });
  });
  it('gets redirected from the app to subscribe page with relevant message', () => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.config().baseUrl}/subscribe`);
    cy.findByRole('heading', {name: subscribePage.unpaid.h2}).should(
      'be.visible',
    );
    cy.findByText(subscribePage.unpaid.bodyText.subscribe).should('be.visible');
    cy.findByText(subscribePage.unpaid.bodyText.data).should('be.visible');
  });
  it('can start subscription on subscribe page', () => {
    cy.intercept('POST', '/api/checkout_sessions').as('checkout');
    cy.visit('/subscribe');
    cy.findByRole('button', {name: subscribePage.unpaid.buttonLabel}).click();
    cy.wait('@checkout').then(({response}) => {
      expect(response.statusCode).to.eq(303);
      expect(response.headers.location).to.match(
        /https:\/\/checkout.stripe.com\/.*/i,
      ); // API ref: https://docs.cypress.io/guides/references/assertions#BDD-Assertions
    });
  });
  it('can log out if they wish', () => {
    cy.intercept('GET', '/api/auth/logout').as('logout');
    cy.visit('/subscribe');
    cy.findByText(subscribePage.unpaid.bodyText.logout).should('be.visible');
    cy.findByText(buttonLabel.logout).click();
    cy.wait('@logout').then(({response}) => {
      expect(response.statusCode).to.eq(302);
      expect(response.headers.location).to.match(
        /https:\/\/my-ideal-map.jp.auth0.com\/v2\/logout.*/i, // TODO #331: replace this url with our own Login page
      ); // API ref: https://docs.cypress.io/guides/references/assertions#BDD-Assertions
    });
  });
});
describe('Cancelled users', () => {
  beforeEach(() => {
    cy.auth('cancelled_users', {
      username: Cypress.env('auth0UserCancelled'),
      password: Cypress.env('auth0PassCancelled'),
    });
  });
  it('get redirected from the app to subscribe page with relevant message', () => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.config().baseUrl}/subscribe`);
    cy.findByRole('heading', {name: subscribePage.reoffer.h2}).should(
      'be.visible',
    );
    cy.findByText(subscribePage.reoffer.bodyText.subscribe).should(
      'be.visible',
    );
  });
  it('can start subscription on subscribe page', () => {
    cy.intercept('POST', '/api/checkout_sessions').as('checkout');
    cy.visit('/subscribe');
    cy.findByRole('button', {name: subscribePage.reoffer.buttonLabel}).click();
    cy.wait('@checkout').then(({response}) => {
      expect(response.statusCode).to.eq(303);
      expect(response.headers.location).to.match(
        /https:\/\/checkout.stripe.com\/.*/i,
      ); // API ref: https://docs.cypress.io/guides/references/assertions#BDD-Assertions
    });
  });
  it('can log out if they wish', () => {
    cy.intercept('GET', '/api/auth/logout').as('logout');
    cy.visit('/subscribe');
    cy.findByText(subscribePage.reoffer.bodyText.logout).should('be.visible');
    cy.findByText(buttonLabel.logout).click();
    cy.wait('@logout').then(({response}) => {
      expect(response.statusCode).to.eq(302);
      expect(response.headers.location).to.match(
        /https:\/\/my-ideal-map.jp.auth0.com\/v2\/logout.*/i, // TODO #331: replace this url with our own Login page
      ); // API ref: https://docs.cypress.io/guides/references/assertions#BDD-Assertions
    });
  });
});

describe('Authorisation to access to user data', () => {
  beforeEach(() => {
    cy.log('**Resetting the database**');
    cy.exec('npx prisma migrate reset --force'); // https://docs.cypress.io/guides/end-to-end-testing/testing-your-app#Seeding-data
  });
  it('Mock User #1 only sees their own saved places', () => {
    cy.auth();
    cy.visit('/');
    cy.waitForMapToLoad();
    // Mock user #2's saved places
    cy.findByRole('button', {name: mockPlace3.properties.name}).should(
      'not.exist',
    );
    cy.findByRole('button', {name: mockPlace5.properties.name}).should(
      'not.exist',
    );
    // TODO: Assert that mock user #1's saved places are loaded
    //       The 'should('be.visible')' doesn't work as it is "hidden" from the map view
  });
  it('Mock User #2 only sees their own saved places', () => {
    cy.auth('subscribed_user2', {
      username: Cypress.env('auth0UserSubscribed2'),
      password: Cypress.env('auth0PassSubscribed2'),
    });
    cy.visit('/');
    cy.waitForMapToLoad();
    // Mock user #1's saved places
    cy.findByRole('button', {name: mockPlace1.properties.name}).should(
      'not.exist',
    );
    cy.findByRole('button', {name: mockPlace2.properties.name}).should(
      'not.exist',
    );
    cy.findByRole('button', {name: mockPlace4.properties.name}).should(
      'not.exist',
    );
    cy.findByRole('button', {name: mockPlace6.properties.name}).should(
      'not.exist',
    );
    cy.findByRole('button', {name: mockPlace7.properties.name}).should(
      'not.exist',
    );
    // TODO: Assert that mock user #2's saved places are loaded
    //       The 'should('be.visible')' doesn't work as it is "hidden" from the map view
  });
});
