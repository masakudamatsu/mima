import styled from 'styled-components';

import {buttonCircle, color, dimension} from 'src/utils/designtokens';
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

const removeTapHighlight = `
  -webkit-tap-highlight-color: transparent;
`;

// Define Button components
export const ButtonCircle = styled.button`
  ${resetStyle}
  ${setClickableArea}
  ${alignButtonLabel}
  ${positionButton}
  ${styleButtonLabel}
  ${styleFocusState}
  ${removeTapHighlight}
`;
