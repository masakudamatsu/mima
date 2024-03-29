import styled, {css} from 'styled-components';
import {stylePopupBackground} from 'src/utils/cssUtilities';
import {
  animation,
  buttonCircle,
  dimension,
  minPopupWidth,
  popupWidthShare,
} from 'src/utils/designtokens';
import {buttonLabel, searchBoxLabel} from 'src/utils/uiCopies';
import {zIndex} from 'src/utils/zIndex';

const placeOverMap = `
  position: absolute;
  z-index: ${zIndex.divSearchBackground};
`;

const breakpoint = minPopupWidth / popupWidthShare;

const setOuterSize = `
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  @media (min-width: ${breakpoint}px) {
    left: ${(1 - popupWidthShare) * 100}%;
  }
`;

const setBackground = stylePopupBackground();

const setInnerSize = `
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  @media (min-width: ${breakpoint}px) {
    left: calc(var(--blur-radius) * 2);
  }
`;

const positionCloseButton = `
  --popup-margin: ${dimension.button['minimum target spacing 100']};

  & button[aria-label="${buttonLabel.closeSearchbox}"] {
    position: absolute;
    right: var(--popup-margin);
    top:  var(--popup-margin);
  }
`;

const positionComponents = `
  ${positionCloseButton}
  & div[id="searchbox"],
  & ul[aria-label="${searchBoxLabel.listbox}"],
  & div[role="alert"] {
    margin: 0 auto; 
    width: calc(100% - var(--popup-margin) * 2) ;
  }
  & div[id="searchbox"] {
    margin-top: calc(${buttonCircle.clickableArea} + var(--popup-margin) * 2);
  }
  & ul[aria-label="${searchBoxLabel.listbox}"] {
    margin-top: ${dimension.button['minimum target spacing 100']};
  }
`;

const animateTransitionIn = css`
  animation-duration: ${animation.toggleIn.duration};
  animation-fill-mode: ${animation.toggleIn.popup.fillMode};
  animation-name: ${animation.toggleIn.popup.opacity},
    ${animation.toggleIn.popup.scale};
  animation-timing-function: ${animation.toggleIn.easing};
  transform-origin: ${animation.toggleIn.origin};
  @media (prefers-reduced-motion: reduce) {
    animation-name: ${animation.toggleIn.reducedMotion.popup.opacity};
  }
`;

const revealMapBeneath = `
  &[data-closing='true'] {
    color: black;
    mix-blend-mode: lighten;
  }
  &[data-closing='true'] [id="ripple"] {
    background-color: currentColor;
  }
`;

const containRippleWithin = `
  overflow: hidden;
`; // Without this, the overflown ripple will render scroll bars, causing the layout shift temporarily

const animateTransitionOut = css`
  &[data-closing='true'] {
    animation-duration: ${animation.toggleOut.duration};
    animation-name: ${animation.toggleOut.popup.opacity};
    animation-fill-mode: ${animation.toggleOut.popup.fillMode};
    animation-timing-function: ${animation.toggleOut.easing};
    @media (prefers-reduced-motion: reduce) {
      animation-duration: ${animation.toggleOut.reducedMotion.duration};
      animation-name: ${animation.toggleOut.reducedMotion.popup.opacity};
    }
  }
`;

export const DivSearchBackground = styled.div`
  ${setBackground}
  ${setInnerSize}
  ${positionComponents}
  ${animateTransitionIn}
  ${animateTransitionOut}
`;

DivSearchBackground.Wrapper = styled.div`
  ${placeOverMap}
  ${setOuterSize}
  ${revealMapBeneath}
  ${containRippleWithin}
`;
