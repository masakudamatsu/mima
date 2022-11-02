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
  & header + div[role="dialog"],
  & header + div[role="alertdialog"] {
    margin-top: ${dimension.button['minimum target size 100']}
  }
  & div[role="dialog"] h2 + div,
  & div[role="alertdialog"] h2 + div,
  & section h2 + p,
  & form h2 + p {
    margin-top: ${dimension.button['minimum target size 50']}  
  }
  & div[role="dialog"] p + p,
  & div[role="alertdialog"] p + p {
    margin-top: ${dimension.button['minimum target size 25']}  
  }
  & div[role="dialog"] div + button,
  & div[role="alertdialog"] div + div,
  p + button,
  p + a {
    margin-top: ${dimension.button['minimum target size 50']}  
  }
`;

const positionComponentsHorizontally = `
  & button + button {
    margin-left: ${dimension.button['minimum target spacing 100']}
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

const setDialogSize = `
  & div[role="dialog"] {
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
  ${positionComponentsHorizontally}
  ${styleText}
  ${setDialogSize}
`;