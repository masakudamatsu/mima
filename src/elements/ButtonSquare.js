import styled from 'styled-components';

import {buttonSquare, color} from 'src/utils/designtokens';
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
  right: 0;
  top: 0;
  z-index: ${zIndex.closeButton};
`;

const setButtonLabelColor = `
  & svg {
    fill: var(--button-label-color-default);
  }
  &:focus svg,
  &:hover svg {
    fill: var(--button-label-color-focus);
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
`;
