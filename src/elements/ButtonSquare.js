import styled from 'styled-components';

import {buttonSquare, color} from 'src/utils/designtokens';
import {removeFocusRing, styleFocusRing} from 'src/utils/cssUtilities';
import {zIndex} from 'src/utils/zIndex';

const resetStyle = `
  background-color: ${color['white 0']};
  border: none;
`;

const setClickableArea = `
  height: ${buttonSquare.clickableArea};
  width: ${buttonSquare.clickableArea};
`;

const alignButtonLabel = `
  align-items: center;
  display: flex;
  justify-content: center;
`;

const positionButton = `
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: ${zIndex.closeButton};
`;

const setButtonLabelColor = `
  & svg {
    fill: var(--button-label-color-default);
  }
`;

const styleFocusState = `
  &:focus { 
    border-width: 1px;
    border-style: solid;
    ${styleFocusRing}
  }
  &:focus svg {
    fill: var(--button-label-color-focus);
  }
  &:focus:not(:focus-visible) {
    ${removeFocusRing}
  }
  &:focus:not(:focus-visible) svg {
    fill: var(--button-label-color-default);
  }
;
`;

/* TODO #108: replace the following with the ripple effect */
const styleActiveState = `
  &:active {
    border-style: none;
    box-shadow: none;
  }
  &:active svg {
    fill: var(--button-outline-color);
  }
`;

// Define Button components
export const ButtonSquare = styled.button`
  ${resetStyle}
  ${setClickableArea}
  ${alignButtonLabel}
  ${positionButton}
  ${setButtonLabelColor}
  ${styleFocusState}
  ${styleActiveState}
`;
