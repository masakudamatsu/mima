const apikey = Cypress.env('apikey');
const googleMapApiUrl = `https://maps.googleapis.com/maps/api/js?callback=__googleMapsCallback&key=${apikey}&v=weekly`;

describe('Integration test with visual testing', () => {
  it('Loads the homepage', () => {
    cy.intercept(googleMapApiUrl).as('googleMapApi');
    cy.visit('/');
    cy.wait('@googleMapApi'); // Wait for Google Maps to be loaded;
    cy.percySnapshot('index', {widths: [320, 768, 1024]});
  });
});
