import styled, {css} from 'styled-components';

import {
  animation,
  color,
  dimension,
  duration,
  easing,
} from 'src/utils/designtokens';
import {zIndex} from 'src/utils/zIndex';

const resetStyle = `
  background-color: ${color['white 0']};
  border: none;
  &:focus {
    outline-style: none; /* remove the default gray box focus-ring for Safari and iOS browsers */
  }
`;

const setClickableArea = `
  height: ${dimension.button['height 100']};
  width: ${dimension.button['width 100']};
`;

const alignButtonLabel = `
  align-items: center;
  display: flex;
  justify-content: center;
`;

const showButtonAboveMap = `
  position: absolute;
  z-index: ${zIndex.button};
`;

const positionButton = `
  &[data-position='top-left'] {
    top: ${dimension.button['height 25']};
    left: ${dimension.button['width 25']};
  }
  &[data-position='top-right'] {
    top: ${dimension.button['height 25']};
    right: ${dimension.button['width 25']};
  }
  &[data-position='bottom-right'] {
    bottom: ${dimension.button['height 50']}; /* Google Maps's default text legend takes up space (about dimension.button['height 25']) at the bottom */
    right: ${dimension.button['width 25']};
  }
  &[data-position='bottom-right-second'] {
    bottom: ${dimension.button['height 175']};
    right: ${dimension.button['width 25']};
  }
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
const setButtonColor = `
  & #cloud {
    fill: var(--button-color);
  }
`;
const buttonShadow = {
  edge: `stroke: var(--button-outline-color);`,
  blur: `
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
  `,
};
const setButtonShadow = `
  & #cloud {
    ${buttonShadow.edge}
  }
  & svg {
    ${buttonShadow.blur}
  }
  &:focus #cloud,
  &:hover #cloud {
    stroke: var(--button-outline-color-focus);
  }
  &:focus:not(:focus-visible) #cloud {
    ${buttonShadow.edge}
  }
  &:focus svg,
  &:hover svg {
    filter: drop-shadow(
      ${dimension.glow['offset']} var(--button-shadow-blur-radius-focus)
        var(--button-shadow-color-focus)
    );
  }
  &:focus:not(:focus-visible) svg {
    ${buttonShadow.blur}
  }
  &:active svg {
    filter: none;
  }
  &:active #cloud {
    stroke: none;
  }
`;

const animateTransitionIn = css`
  animation-duration: ${animation.toggleOut.duration};
  animation-fill-mode: ${animation.toggleOut.button.fillMode};
  animation-name: ${animation.toggleOut.button.opacity},
    ${animation.toggleOut.button.scale};
  animation-timing-function: ${animation.toggleOut.easing};
  @media (prefers-reduced-motion: reduce) {
    animation-name: ${animation.toggleOut.button.opacity};
  }
`;

const animateTransitionOut = css`
  &[data-closing='true'] {
    transform-origin: ${animation.toggleIn.origin};
    animation-duration: ${animation.toggleIn.duration};
    animation-fill-mode: ${animation.toggleIn.button.fillMode};
    animation-name: ${animation.toggleIn.button.opacity},
      ${animation.toggleIn.button.scale};
    animation-timing-function: ${animation.toggleIn.easing};
    @media (prefers-reduced-motion: reduce) {
      animation-name: ${animation.toggleIn.button.opacity};
    }
  }
`;

const blinkButton = css`
  &[data-loading='true'] {
    animation: ${animation.flashing} ${duration.flashing} ${easing.linear}
      infinite;
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
  ${animateTransitionIn}
  ${animateTransitionOut}
  ${blinkButton}
`;
