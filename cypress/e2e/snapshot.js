// let scrollToBottom = require('scroll-to-bottomjs'); // to deal with lazy-loading images. see https://docs.percy.io/docs/capturing-lazy-loading-images
// scroll-to-bottomjs appears to fix the scroll position at the bottom
// so cy.scrollTo('top') doesn't appear to work afterwards, to reveal the top app bar
// we instead use cy.scrollTo('bottom', {duration: 2000})

describe('Integration test with visual testing', () => {
  it('Loads the homepage', () => {
    cy.visit('/');
    // Scroll to the bottom so all the images will be loaded before taking a snapshot
    cy.scrollTo('bottom', {duration: 2000, ensureScrollable: false});
      // Percy recommends using `scroll-to-bottomjs` package with
      // ```
      // cy.window().then(cyWindow => scrollToBottom({remoteWindow: cyWindow}));
      // ```
      // but then cy.scrollTo('top') doesn't work afterwards, to reveal the top app bar
    cy.percySnapshot('index', {widths: [320, 410, 648, 836, 1011]});
    // 320px for the narrowest screen to support
    // 410px for font-size change breakpoint
    // 648px for the middle point between 571px to 727px
    // 836px for the middle point between 728px to 945px
    // 1011px for the breakpoint to show the background on both sides
  });
});
