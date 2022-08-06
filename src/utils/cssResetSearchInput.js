export const resetSearchInput = `
  -moz-appearance: none;
  -webkit-appearance: none; /* https://css-tricks.com/webkit-html5-search-inputs/#comment-82402 */
  -webkit-box-sizing: content-box; /* https://css-tricks.com/webkit-html5-search-inputs/#comment-82447 */
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none; /* https://css-tricks.com/webkit-html5-search-inputs/#comment-82432 */
  }
  outline: none; /* Otherwise Safari shows an outline when focused */
  -webkit-tap-highlight-color: transparent; /* Otherwise, tapping will show a flash of grey background */
`;
