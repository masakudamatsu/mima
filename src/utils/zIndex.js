// Z-index management a la https://www.smashingmagazine.com/2021/02/css-z-index-large-projects/
const base = 0;
const above = 1;
// const below = -1;

const button = above + base;

const formSearch = above + button;
const paragraphLoading = above + formSearch;
const closeButton = above + paragraphLoading;
const divSearch = above + formSearch;

const divScrim = above + button;
const divPopup = above + divScrim;

const divModalBackdrop = above + divPopup;

export const zIndex = {
  button,
  closeButton,
  formSearch,
  divModalBackdrop,
  divScrim,
  divSearch,
  divPopup,
  paragraphLoading,
};
