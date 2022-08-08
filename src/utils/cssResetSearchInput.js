const removeRoundCorners = `
  -webkit-appearance: none; /* https://css-tricks.com/webkit-html5-search-inputs/#comment-82402 */
`;
const removeLeftPaddingForSafari = `
  &::-webkit-search-decoration {
    -webkit-appearance: none; /* https://github.com/filipelinhares/ress/blob/master/ress.css */
  }
`;
const removeDeleteTextButtonForSafari = `
  &::-webkit-search-cancel-button {
    -webkit-appearance: none; /* https://css-tricks.com/webkit-html5-search-inputs/#aa-styling-search-graphical-widgets */
  }
`;

const removeTapHighlightColorForSafari = `
  -webkit-tap-highlight-color: transparent; /* Otherwise, tapping will show a flash of grey background; see https://twitter.com/masa_kudamatsu/status/1429387005658468356 */
`;

export const resetSearchInput = `
  ${removeRoundCorners}
  ${removeLeftPaddingForSafari}
  ${removeDeleteTextButtonForSafari}
  ${removeTapHighlightColorForSafari}
`; // TODO #41: reset the gray focus ring
