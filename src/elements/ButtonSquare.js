import styled from 'styled-components';

import {buttonSquare, color, dimension} from 'src/utils/designtokens';
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
    border-color: var(--button-shadow-color-focus);
    box-shadow: ${dimension.glow['offset']} var(--button-shadow-blur-radius-focus) var(--button-shadow-color-focus);
    /* remove the default focus ring & fallback for Forced Color Modes (https://www.sarasoueidan.com/blog/focus-indicators/#tips-for-styling-focus-indicators) */
    outline: 1px solid transparent; 
    }
  &:focus svg {
    fill: var(--button-label-color-focus);
  }
  &:focus:not(:focus-visible) {
    border-style: none;
    box-shadow: none;
    }
  &:focus:not(:focus-visible) svg {
    fill: var(--button-label-color-default);
  }
  &:active svg {
    fill: var(--button-label-color-default);
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
`;
