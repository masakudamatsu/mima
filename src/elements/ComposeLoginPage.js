import styled from 'styled-components';
import {dimension} from 'src/utils/designtokens';
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
  & header + form {
    margin-top: ${dimension.button['minimum target size 100']}
  }
`;

export const ComposeLoginPage = styled.div`
  ${setSize}
  ${setBackground}
  ${setMargins}
  ${centerAlignComponents}
  ${positionComponentsVertically}
`;
