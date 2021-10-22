import styled, {css, keyframes} from 'styled-components';

import {color, dimension} from 'src/utils/designtokens';
import {zIndex} from 'src/utils/zIndex';

const resetStyle = css`
  background-color: ${color['white 0']};
  border: none;
`;

const setClickableArea = css`
  height: ${dimension.button['height 100']};
  width: ${dimension.button['width 100']};
`;

const alignButtonLabel = css`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const showButtonAboveMap = css`
  position: absolute;
  z-index: ${zIndex.button};
`;

const positionButton = css`
  &[data-position='top-left'] {
    top: ${dimension.button['height 25']};
    left: ${dimension.button['width 25']};
  }
  &[data-position='top-right'] {
    top: ${dimension.button['height 25']};
    right: ${dimension.button['width 25']};
  }
  &[data-position='bottom-right'] {
    bottom: ${dimension.button[
      'height 50'
    ]}; /* Google Maps's default text legend takes up space (about dimension.button['height 25']) at the bottom */
    right: ${dimension.button['width 25']};
  }
  &[data-position='bottom-right-second'] {
    bottom: ${dimension.button['height 175']};
    right: ${dimension.button['width 25']};
  }
`;

const setButtonLabelColor = css`
  & svg {
    fill: var(--button-label-color-default);
  }
  &:focus svg,
  &:hover svg {
    fill: var(--button-label-color-focus);
  }
  &:active svg {
    fill: var(--button-label-color-default);
  }
`;
const setButtonColor = css`
  & #cloud {
    fill: var(--button-color);
  }
`;
const setButtonShadow = css`
  & #cloud {
    stroke: var(--button-outline-color);
  }
  & svg {
    filter: drop-shadow(
        ${dimension.shadow['offset']} ${dimension.shadow['blur layer 1']}
          var(--button-shadow-color)
      )
      drop-shadow(
        ${dimension.shadow['offset']} ${dimension.shadow['blur layer 2']}
          var(--button-shadow-color)
      )
      drop-shadow(
        ${dimension.shadow['offset']} ${dimension.shadow['blur layer 3']}
          var(--button-shadow-color)
      );
  }
  &:focus #cloud,
  &:hover #cloud {
    stroke: var(--button-outline-color-focus);
  }
  &:focus svg,
  &:hover svg {
    filter: drop-shadow(
      ${dimension.glow['offset']} var(--button-shadow-blur-radius-focus)
        var(--button-shadow-color-focus)
    );
  }
  &:active svg {
    filter: none;
  }
  &:active #cloud {
    stroke: none;
  }
`;
const setColorScheme = css`
  &[data-darkmode='false'] {
    --button-label-color-default: ${color['dark-grey 100']};
    --button-label-color-focus: ${color['black 100']};
    --button-color: ${color['white 93']};
    --button-outline-color: ${color['light-grey 100']};
    --button-outline-color-focus: ${color['focus-blue 100']};
    --button-shadow-blur-radius-focus: ${dimension.glow['blur daytime']};
    --button-shadow-color: ${color['black 33']};
    --button-shadow-color-focus: ${color['focus-blue 100']};
  }
  &[data-darkmode='true'] {
    --button-label-color-default: ${color['off-white 100']};
    --button-label-color-focus: ${color['white 100']};
    --button-color: ${color['mid-grey 80']};
    --button-outline-color: ${color['off-black 100']};
    --button-outline-color-focus: ${color['white 40']};
    --button-shadow-blur-radius-focus: ${dimension.glow['blur nighttime']};
    --button-shadow-color: ${color['black 60']};
    --button-shadow-color-focus: ${color['white 100']};
  }
`;

const flashing = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const blinkButton = css`
  &[data-loading='true'] {
    animation: ${flashing} 1500ms linear infinite;
  }
`;

// Define Button components
export const Button = styled.button`
  ${resetStyle}
  ${setClickableArea}
  ${alignButtonLabel}
  ${showButtonAboveMap}
  ${positionButton}
  ${setButtonLabelColor}
  ${setButtonColor}
  ${setButtonShadow}
  ${setColorScheme}
  ${blinkButton}
`;
