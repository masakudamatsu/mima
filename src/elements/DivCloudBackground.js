import styled, {css, keyframes} from 'styled-components';
import {duration} from 'src/utils/designtokens';
import {zIndex} from 'src/utils/zIndex';

const placeOverButtons = `
  position: absolute;
  z-index: ${zIndex.divCloudBackground};  
`;

const setBackground = `
  --blur-radius: 8px;

  /* legacy browsers */
  background-color: var(--popup-background-color-fallback);

  /* Modern browsers */
  @supports (backdrop-filter: blur(var(--blur-radius))) {
    background-color: var(--popup-background-color);
    backdrop-filter: blur(var(--blur-radius));  
  } 

  /* Firefox and Kai OS */
  @supports (background-image: -moz-element(#map)) and (not (backdrop-filter: blur(var(--blur-radius)))) {
    background-color: transparent;
    /* Blurring the map beneath */
    &::before {
      background-attachment: fixed;
      background-image: -moz-element(#map);
      content: "";
      filter: blur(var(--blur-radius));
      position: absolute;
      left: 0; right: 0; top: 0; bottom: 0;
      z-index: -2;
    }
    /* Applying translucent white on top */
    &::after {
      background-color: var(--popup-background-color);
      content: "";
      position: absolute;
      left: 0; right: 0; top: 0; bottom: 0;
      z-index: -1;
    }
  }
`;

const setSize = `
  height: 100%;
  width: 100%;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const animateTransition = css`
  animation-duration: ${duration.modal.enter}ms;
  animation-fill-mode: backwards;
  animation-name: ${fadeIn};
  animation-timing-fiunction: linear;
  &[data-transition-out='true'] {
    animation-duration: ${duration.modal.exit}ms;
    animation-name: ${fadeOut};
    animation-fill-mode: forwards;
  }
`;

export const DivCloudBackground = styled.div`
  ${placeOverButtons}
  ${setBackground}
  ${setSize}
  ${animateTransition}
`;
