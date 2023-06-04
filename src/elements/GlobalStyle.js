import {createGlobalStyle} from 'styled-components';
import {color, dimension, map} from 'src/utils/designtokens';

import {fontface} from 'src/utils/cssFontface';
import {ress} from 'src/utils/cssRess';
import {resetRangeInput} from 'src/utils/cssResetRangeInput';
import {resetSearchInput} from 'src/utils/cssResetSearchInput';

const makeMapFullscreen = `
  :root,
  body,
  #__next,
  #index-page-main {
    height: 100%;
  }
`;

const setBackground = `
  body[data-darkmode='false'] {
    background-color: ${map.cityblocks.day};
  }
  body[data-darkmode='true'] {
    background-color: ${map.cityblocks.night};
  }
`;

const setColorScheme = `
  body[data-darkmode='false'] {
    --button-label-color-default: ${color['dark-grey 100']};
    --button-label-color-focus: ${color['black 100']};
    --button-color: ${color['white 93']};
    --button-outline-color: ${color['light-grey 100']};
    --button-outline-color-focus: ${color['focus-blue 100']};
    --button-shadow-blur-radius-focus: ${dimension.glow['blur daytime']};
    --button-shadow-color: ${color['black 33']};
    --button-shadow-color-focus: ${color['focus-blue 100']};
    --dialog-button-color: ${color['google-blue 100']};
    --link-text-color: ${color['google-blue 100']};
    --menu-border-color: ${color['google-blue 100']};
    --menu-item-color: ${color['dark-grey 100']};
    --popup-background-color: ${color['white 75']};
    --popup-glow-color: ${color['white 75']};
    --popup-background-color-fallback: ${color['white 93']};
    --popup-glow-color-fallback: ${color['white 93']};
    --popup-text-color: ${color['dark-grey 100']};
    --placeholder-text-color: ${color['placeholder-grey 100']};
    --popup-background-highlighted: ${color['background for dark-grey text 100']};
    --ripple-color: ${color['black 33']};
    --login-background-image-url: url(/login-background-light.png);
  }
  body[data-darkmode='true'] {
    --button-label-color-default: ${color['off-white 100']};
    --button-label-color-focus: ${color['white 100']};
    --button-color: ${color['mid-grey 80']};
    --button-outline-color: ${color['off-black 100']};
    --button-outline-color-focus: ${color['white 40']};
    --button-shadow-blur-radius-focus: ${dimension.glow['blur nighttime']};
    --button-shadow-color: ${color['black 60']};
    --button-shadow-color-focus: ${color['white 100']};
    --dialog-button-color: ${color['moonlight 100']};
    --link-text-color: ${color['moonlight 100']}; 
    --menu-border-color: ${color['moonlight 100']};
    --menu-item-color: ${color['off-white 100']};
    --popup-background-color: ${color['glass-grey 75']};
    --popup-glow-color: ${color['glass-grey 75']};
    --popup-background-color-fallback: ${color['glass-grey 90']};
    --popup-glow-color-fallback: ${color['glass-grey 90']};
    --popup-text-color: ${color['off-white 100']};
    --placeholder-text-color: ${color['placeholder-white 100']};
    --popup-background-highlighted: ${color['off-black 100']};
    --ripple-color: ${color['white 40']};
    --login-background-image-url: url(/login-background-dark.png);
  }
`;

// TODO #203
// const styleDeleteButton = `
//   body[data-darkmode='false'] {
//     --delete-button: url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${color['dark-grey 100']}' %3E%3Cpath d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' /%3E%3C/svg%3E%0A");
//   }
//   body[data-darkmode='true'] {
//     --delete-button: url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${color['off-white 100']}' %3E%3Cpath d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' /%3E%3C/svg%3E%0A");
//   }
// `;

export const GlobalStyle = createGlobalStyle`
  ${fontface}
  ${ress}
  ${resetRangeInput}
  ${resetSearchInput}

  input {
    color: inherit; /* Prevent Chrome from applying "internal-light-dark" to override the body element's color property */
  }
  ${setBackground}
  ${setColorScheme}
  ${makeMapFullscreen}
`;
