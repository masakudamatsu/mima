import styled from 'styled-components';
import {bodyText, dimension, h2PlaceName} from 'src/utils/designtokens';
import {remify} from 'src/utils/remify';
import {stylePopupBackground} from 'src/utils/cssUtilities';

const setSize = `
  height: 100%;
`;
const setBackground = stylePopupBackground();
const setMargins = `
  padding: ${dimension.button['minimum target size 100']}; 
`; // We cannot use `margin` property so the background map image will spread full-screen

const centerAlignComponents = `
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const positionComponentsVertically = `
  & header + form,
  & header + main {
    margin-top: ${dimension.button['minimum target size 100']}
  }
  & form h2 + p,
  & main h2 + p {
    margin-top: ${dimension.button['minimum target size 50']}  
  }
  & form p + p {
    margin-top: ${dimension.button['minimum target size 25']}  
  }
  p + button,
  p + a {
    margin-top: ${dimension.button['minimum target size 50']}  
  }
`;

const styleText = `
  color: var(--popup-text-color);
  font-family: ${bodyText.fontFamily};
  font-size: ${remify(bodyText.fontSize)};
  font-weight: ${bodyText.fontWeight};
  line-height: ${bodyText.lineHeight};  
  & a {
    color: var(--link-text-color);
  }
  & h2 {
    font-family: ${h2PlaceName.fontFamily};
    font-size: ${remify(h2PlaceName.fontSize)};
    font-weight: ${h2PlaceName.fontWeight};
    line-height: ${h2PlaceName.lineHeight};
  }
`;

const setComponentSize = `
  & form,
  & main {
    max-width: ${dimension.searchBox['max-width']};
    width: 100%;
  }
`;

export const ComposeLoginPage = styled.div`
  ${setSize}
  ${setBackground}
  ${setMargins}
  ${centerAlignComponents}
  ${positionComponentsVertically}
  ${styleText}
  ${setComponentSize}
`;
