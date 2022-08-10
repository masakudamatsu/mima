const removeLeftPaddingForSafari = `
  &::-webkit-search-decoration {
    -webkit-appearance: none; /* https://github.com/filipelinhares/ress/blob/master/ress.css */
  }
`;

const removeTapHighlightColorForSafari = `
  -webkit-tap-highlight-color: transparent; /* Otherwise, tapping will show a flash of grey background; see https://twitter.com/masa_kudamatsu/status/1429387005658468356 */
`;

export const resetSearchInput = `
  ${removeLeftPaddingForSafari}
  ${removeTapHighlightColorForSafari}
`; // TODO #41: reset the gray focus ring
