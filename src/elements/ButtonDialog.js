import styled from 'styled-components';

import {color, dimension} from 'src/utils/designtokens';

const setShape = `
  border-radius: ${dimension.button['border radius 100']};
  border-style: solid;
  border-width: ${dimension.button['border width 100']};
  min-height: ${dimension.button['minimum target size 100']};
  min-width: ${dimension.button['minimum target size 200']};
`;

const setColor = `
  border-color: var(--dialog-button-color);
  color: var(--dialog-button-color);
`;

const setFocusStyle = `
  &:focus {
    outline: ${dimension.button['border width 200']} solid
      ${color['focus-blue 100']};
    outline-offset: ${dimension.button['border width 200']};
  }
  &:focus:not(:focus-visible) {
    outline: none;
    outline-offset: initial;
  }
`;

const resetLinkStyle = `
  &[data-reset-link-style="true"] {
    align-items: center;
    display: flex;
    justify-content: center;
    text-decoration: none;
  }
`; // if used as an <a> element

// Define Button components
export const ButtonDialog = styled.button`
  ${setShape}
  ${setColor}
  ${setFocusStyle}
  ${resetLinkStyle}
`;
