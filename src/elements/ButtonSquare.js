import styled, {css} from 'styled-components';

import {buttonSquare, color, popup} from 'src/utils/designtokens';

const resetStyle = css`
  background-color: ${color['white 0']};
  border: none;
`;

const setClickableArea = css`
  height: ${buttonSquare.clickableArea};
  width: ${buttonSquare.clickableArea};
`;

const alignButtonLabel = css`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const positionButton = css`
  position: absolute;
  right: -${popup.spreadRadius};
  top: -${popup.spreadRadius};
`;

const setButtonLabelColor = css`
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
