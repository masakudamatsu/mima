describe('Initial UI', () => {
  beforeEach(() => {
    cy.auth('testuser1');
  });
  it('Rendered in Light Mode at Daytime', () => {
    cy.visitAtDaytime('/');
    cy.waitForMapToLoad();
    cy.percySnapshot('initial-ui-daytime', {widths: [320, 768, 1024]});
  });
  it('Rendered in Dark Mode at Nighttime', () => {
    cy.visitAtNight('/');
    cy.waitForMapToLoad();
    cy.percySnapshot('initial-ui-nighttime', {widths: [320, 768, 1024]});
  });
});
