describe('After clicking a saved place', () => {
  const placeName = 'Osen';
  describe('UI changes as expected', () => {
    it('Daytime', () => {
      cy.visitAtDaytime('/');
      cy.waitForMapToLoad();
      // execute
      cy.findByRole('button', {name: placeName}).click();
      // verify
      cy.percySnapshot('saved-place-after-click-daytime', {
        widths: [320, 768, 1024],
      });
    });
    it('Nighttime', () => {
      cy.visitAtNight('/');
      cy.waitForMapToLoad();
      // execute
      cy.findByRole('button', {name: placeName}).click();
      // verify
      cy.percySnapshot('saved-place-after-click-nighttime', {
        widths: [320, 768, 1024],
      });
    });
  });
});
