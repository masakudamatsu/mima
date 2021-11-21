import {createGlobalStyle} from 'styled-components';
import {color, dimension, map} from 'src/utils/designtokens';

import {fontface} from 'src/utils/cssFontface';
import {ress} from 'src/utils/cssRess';
import {resetRangeInput} from 'src/utils/cssResetRangeInput';

const makeMapFullscreen = `
  :root,
  body,
  #__next {
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
    --error-dialog-button-color: ${color['google-blue 100']};
    --link-text-color: ${color['google-blue 100']};
    --menu-border-color: ${color['google-blue 100']};
    --menu-item-color: ${color['dark-grey 100']};
    --popup-background-color: ${color['white 75']};
    --popup-glow-color: ${color['white 75']};
    --popup-background-color-firefox: ${color['white 93']};
    --popup-glow-color-firefox: ${color['white 93']};
    --popup-text-color: ${color['dark-grey 100']};
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
    --error-dialog-button-color: ${color['google-blue-light 100']};
    --link-text-color: ${color['google-blue-light 100']}; 
    --menu-border-color: ${color['google-blue-light 100']};
    --menu-item-color: ${color['off-white 100']};
    --popup-background-color: ${color['glass-grey 75']};
    --popup-glow-color: ${color['glass-grey 75']};
    --popup-background-color-firefox: ${color['glass-grey 90']};
    --popup-glow-color-firefox: ${color['glass-grey 90']};
    --popup-text-color: ${color['off-white 100']};
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${fontface}
  ${ress}
  ${resetRangeInput}

  input {
    color: inherit; /* Prevent Chrome from applying "internal-light-dark" to override the body element's color property */
  }
  ${setBackground}
  ${setColorScheme}
  ${makeMapFullscreen}
`;
