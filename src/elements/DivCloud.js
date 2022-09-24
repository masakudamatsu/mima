import styled from 'styled-components';

import {bodyText} from 'src/utils/designtokens';
import {remify} from 'src/utils/remify';
import {stylePopupBackground} from 'src/utils/cssUtilities';
import {zIndex} from 'src/utils/zIndex';

const styleBackground = stylePopupBackground();

const setFontStyle = `
  font-family: ${bodyText.fontFamily};
  font-size: ${remify(bodyText.fontSize)};
  font-weight: ${bodyText.fontWeight};
  line-height: ${bodyText.lineHeight};
`;
const setTextColor = `
  color: var(--popup-text-color);
  & a {
    color: var(--link-text-color);
  }
`;

const placeOverBackground = `
  height: 100%;
  position: absolute;
  top: 0; /* Without this, it won't be placed over the background */
  width: 100%;
  z-index: ${zIndex.formSearch};
`;

export const DivCloud = styled.div`
  ${styleBackground}
  ${setFontStyle}
  ${setTextColor}
  ${placeOverBackground}
`;
