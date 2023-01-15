import styled, {css} from 'styled-components';
import {stylePopupBackground} from 'src/utils/cssUtilities';
import {
  animation,
  bodyText,
  buttonCircle,
  dimension,
} from 'src/utils/designtokens';
import {buttonLabel} from 'src/utils/uiCopies';
import {remify} from 'src/utils/remify';
import {zIndex} from 'src/utils/zIndex';

const placeOverMap = `
  position: absolute;
  z-index: ${zIndex.divSearchBackground};
`;

const minPopupWidth = 365;
// for consistency with Search box popup
const widthRatio = {
  map: 67,
  popup: 33,
};
// to ensure the popup will occupy at least one-third of the screen
// for aesthestically pleasing effects (the rule of the third)
const breakpoint = Math.round(
  (minPopupWidth / widthRatio.popup) * (widthRatio.map + widthRatio.popup),
);
const setOuterSize = `
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  @media (min-width: ${breakpoint}px) {
    right: calc(${widthRatio.map}%);
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
    right: calc(var(--blur-radius) * 2);
  }
`;

const positionCloseButton = `
  --popup-margin: ${dimension.button['minimum target spacing 100']};

  & button[aria-label="${buttonLabel.close}"] {
    position: absolute;
    right: var(--popup-margin);
    top:  var(--popup-margin);
  }
`;

const setPadding = `
  padding: 0 10px 10px 10px;
  @media screen and (min-width: ${dimension.breakpoint.divPopup.padding}) {
    padding: 0 ${buttonCircle.clickableArea} ${buttonCircle.clickableArea} ${buttonCircle.clickableArea};
  }
`;

const setFontStyle = `
  color: var(--popup-text-color);
  font-family: ${bodyText.fontFamily};
  font-size: ${remify(bodyText.fontSize)};
  font-weight: ${bodyText.fontWeight};
  line-height: ${bodyText.lineHeight};
`;

const animateTransitionIn = css`
  animation-duration: ${animation.toggleIn.duration};
  animation-fill-mode: ${animation.toggleIn.popup.fillMode};
  animation-name: ${animation.toggleIn.popup.opacity},
    ${animation.toggleIn.popup.scale};
  animation-timing-function: ${animation.toggleIn.easing};
  transform-origin: top left;
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

export const DivMenuBackground = styled.div`
  ${setBackground}
  ${setInnerSize}
  ${setPadding}
  ${positionCloseButton}
  ${setFontStyle}
  ${animateTransitionIn}
  ${animateTransitionOut}
`;

DivMenuBackground.Wrapper = styled.div`
  ${placeOverMap}
  ${setOuterSize}
  ${revealMapBeneath}
  ${containRippleWithin}
`;
