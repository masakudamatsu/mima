import styled, {css} from 'styled-components';
import {stylePopupBackground} from 'src/utils/cssUtilities';
import {animation, buttonCircle, dimension} from 'src/utils/designtokens';
import {buttonLabel, searchBoxLabel} from 'src/utils/uiCopies';
import {zIndex} from 'src/utils/zIndex';

const placeOverMap = `
  position: absolute;
  z-index: ${zIndex.divSearchBackground};
`;

const setBackground = stylePopupBackground({withEdges: true});

const setSize = `
  height: 100%;
  width: 100%;
`;

const positionComponents = `
  --popup-margin: ${dimension.button['minimum target spacing 100']};

  & button[aria-label="${buttonLabel.closeSearchbox}"] {
    position: absolute;
    right: var(--popup-margin);
    top:  var(--popup-margin);
  }
  & div[id="searchbox"],
  & ul[aria-label="${searchBoxLabel.listbox}"] {
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
    animation-name: ${animation.toggleIn.popup.opacity};
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
  &[data-closing='true'] {
    overflow: hidden;
  }
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
  ${placeOverMap}
  ${setBackground}
  ${setSize}
  ${positionComponents}
  ${animateTransitionIn}
  ${animateTransitionOut}
  ${revealMapBeneath}
  ${containRippleWithin}
`;
