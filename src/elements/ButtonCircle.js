import styled, {css} from 'styled-components';

import {
  animation,
  buttonCircle,
  color,
  dimension,
} from 'src/utils/designtokens';
import {removeFocusRing, styleFocusRing} from 'src/utils/cssUtilities';
import {zIndex} from 'src/utils/zIndex';

const resetStyle = `
  background-color: ${color['white 0']};
  border: none;
`;

const setClickableArea = `
  border-radius: 50%;
  height: ${buttonCircle.clickableArea};
  width: ${buttonCircle.clickableArea};
`;

const alignButtonLabel = `
  align-items: center;
  display: flex;
  justify-content: center;
`;

// TODO #201: remove this once CloseButton is reused in PlaceInfo, MenuButton, SearchedPlace
const positionButton = `
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: ${zIndex.closeButton};
`;

const styleButtonLabel = `
  & svg {
    fill: var(--button-label-color-default);
    height: ${dimension.button['minimum target size 75']};
    width: ${dimension.button['minimum target size 75']};
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

const styleActiveState = css`
  /* position: relative; (unnecessary because the button is absolutely positioined by FormSearch.js */
  /* overflow: hidden; (unnecessary for close button as we want the ripple to spread across the screen) */
  & .ripple {
    /* to be used in line 14 of createRipple.js */
    animation: ${animation['ripple 100']} 300ms linear;
    background-color: var(--ripple-color);
    border-radius: 50%;
    position: absolute;
    transform: scale(0);
  }
`;

// Define Button components
export const ButtonCircle = styled.button`
  ${resetStyle}
  ${setClickableArea}
  ${alignButtonLabel}
  ${positionButton}
  ${styleButtonLabel}
  ${styleFocusState}
  ${styleActiveState}
`;
