import {createGlobalStyle} from 'styled-components';
import {map} from 'src/utils/designtokens';

import {fontface} from 'src/utils/cssFontface';
import {modernCssReset} from 'src/utils/cssModernReset';
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

const GlobalStyle = createGlobalStyle`
  ${fontface}
  ${modernCssReset}
  ${resetRangeInput}

  input {
    color: inherit; /* Prevent Chrome from applying "internal-light-dark" to override the body element's color property */
  }
  ${setBackground}
  ${makeMapFullscreen}
`;

export default GlobalStyle;
