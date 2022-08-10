const removeLeftPaddingForSafari = `
  &::-webkit-search-decoration {
    -webkit-appearance: none; /* https://github.com/filipelinhares/ress/blob/master/ress.css */
  }
`;
const removeDeleteTextButton = `
  &::-webkit-search-cancel-button {
    -webkit-appearance: none; /* For Chrome and Safari; https://css-tricks.com/webkit-html5-search-inputs/#aa-styling-search-graphical-widgets */
  }
`;

const removeTapHighlightColorForSafari = `
  -webkit-tap-highlight-color: transparent; /* Otherwise, tapping will show a flash of grey background; see https://twitter.com/masa_kudamatsu/status/1429387005658468356 */
`;

export const resetSearchInput = `
  ${removeLeftPaddingForSafari}
  ${removeDeleteTextButton}
  ${removeTapHighlightColorForSafari}
`; // TODO #41: reset the gray focus ring
