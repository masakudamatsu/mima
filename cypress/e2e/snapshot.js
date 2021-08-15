// let scrollToBottom = require('scroll-to-bottomjs'); // to deal with lazy-loading images. see https://docs.percy.io/docs/capturing-lazy-loading-images
// scroll-to-bottomjs appears to fix the scroll position at the bottom
// so cy.scrollTo('top') doesn't appear to work afterwards, to reveal the top app bar
// we instead use cy.scrollTo('bottom', {duration: 2000})

describe('Integration test with visual testing', () => {
  it('Loads the homepage', () => {
    cy.visit('/');
    cy.percySnapshot('index', {widths: [320, 768, 1024]});
  });
});
