// Z-index management a la https://www.smashingmagazine.com/2021/02/css-z-index-large-projects/
const base = 0;
const above = 1;
// const below = -1;

const button = above + base;

const divCloudBackground = above + button;
const paragraphLoading = above + divCloudBackground;
const closeButton = above + paragraphLoading;
const divSearch = above + divCloudBackground;

const divScrim = above + button;
const divPopup = above + divScrim;

export const zIndex = {
  button,
  closeButton,
  divCloudBackground,
  divScrim,
  divSearch,
  divPopup,
  paragraphLoading,
};
