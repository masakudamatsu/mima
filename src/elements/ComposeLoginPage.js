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
  & form p + p,
  & main p + p {
    margin-top: ${dimension.button['minimum target size 25']}  
  }
  p + button,
  p + a {
    margin-top: ${dimension.button['minimum target size 50']}  
  }
  a + a,
  button + a,
  a + button,
  button + button {
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

const styleButton = `
  & a[data-button-purpose="signup"],
  & button[data-button-purpose="signup"] {
    background-color: var(--dialog-button-color);
    color: var(--primary-button-text-color); /* TODO #344: Make button label text see-through the background */
    width: 100%;
  }
`;

const setComponentSize = `
  & form,
  & header,
  & main {
    max-width: 495px; /* Next.js Image component for the logo cannot be wider than this value for some reason... */
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
  ${styleButton}
  ${setComponentSize}
`;
