import {
  buttonLabel,
  loginPage,
  signupPage,
  subscribePage,
} from '../../src/utils/uiCopies';

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
});

describe('Subscribed users', () => {
  beforeEach(() => {
    cy.auth();
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
