import styled, {css} from 'styled-components';
import {stylePopupBackground} from 'src/utils/cssUtilities';
import {
  animation,
  bodyText,
  capHeight,
  dimension,
  h2PlaceName,
} from 'src/utils/designtokens';
import {buttonLabel} from 'src/utils/uiCopies';
import {remify} from 'src/utils/remify';
import {zIndex} from 'src/utils/zIndex';

const placeOverMap = `
  position: absolute;
  z-index: ${zIndex.divSearchBackground};
`;

const setOuterSize = `
  bottom: 0;
  left: 0;
  right: 0;
  top: 50%;
  &[data-fullscreen="true"] {
    top: 0;
  }
`;

const setBackground = stylePopupBackground();

const setInnerSize = `
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: calc(var(--blur-radius) * 2);
  &[data-fullscreen="true"] {
    top: 0;
  }`;
const setPadding = `
  padding-bottom: ${dimension.button['minimum target spacing 100']};
  padding-left: ${dimension.button['minimum target spacing 100']};
  padding-right: ${dimension.button['minimum target spacing 100']};
  padding-top: 0;
  @media screen and (min-width: ${dimension.breakpoint.divPopup.padding}) {
    padding-bottom: ${dimension.button['minimum target size 100']};
    padding-left: ${dimension.button['minimum target size 100']};
    padding-right: ${dimension.button['minimum target size 100']};
  }
`;

const positionCloseButton = `
  & button[aria-label="${buttonLabel.closePlaceDetail}"] {
    position: absolute;
    right: ${dimension.button['minimum target spacing 100']};
    top: ${dimension.button['minimum target spacing 100']};
  }
`;
const positionOtherButtons = `
  & button+button {
    margin-left: ${dimension.button['minimum target spacing 100']};
  }
`;
const positionComponents = `
  ${positionCloseButton}
  ${positionOtherButtons}
  & h2,
  & p {
    --close-button-width: calc(${
      dimension.button['minimum target size 100']
    } + ${dimension.button['minimum target spacing 100']} * 2);
    max-width: ${dimension.searchBox['max-width']};
    width: calc(100% - var(--close-button-width));    
  }

  /* vertical spacing */
  & h2 {
    padding-bottom: ${remify(h2PlaceName.paddingBottom)};
    padding-top: ${remify(h2PlaceName.paddingTop)};
  }
  & p:first-of-type {
    margin-top: -${remify(bodyText.spaceTop)};
  }
  & p + p {
    margin-top: ${remify(bodyText.spaceBetweenParagraphs)};
  }
  & div + button,
    p + button {
    margin-top: ${remify(capHeight[200] - bodyText.spaceBottom)};
  }
`;

const setFontStyle = `
  color: var(--popup-text-color);
  font-family: ${bodyText.fontFamily};
  font-size: ${remify(bodyText.fontSize)};
  font-weight: ${bodyText.fontWeight};
  line-height: ${bodyText.lineHeight};
  & a {
    color: var(--link-text-color);
  }
  & h2 {
    font-family: ${h2PlaceName.fontFamily};
    font-size: ${remify(h2PlaceName.fontSize)};
    font-weight: ${h2PlaceName.fontWeight};
    line-height: ${h2PlaceName.lineHeight};
  }
`;

const animateTransitionIn = css`
  animation-duration: ${animation.showDetail.duration};
  animation-fill-mode: ${animation.showDetail.fillMode};
  animation-name: ${animation.showDetail.opacity};
  animation-timing-function: ${animation.showDetail.easing};
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

export const DivPlaceInfoBackground = styled.div`
  ${setBackground}
  ${setInnerSize}
  ${setPadding}
  ${positionComponents}
  ${setFontStyle} 
  ${animateTransitionIn}
  ${animateTransitionOut}
`;

DivPlaceInfoBackground.Wrapper = styled.div`
  ${placeOverMap}
  ${setOuterSize}
  ${revealMapBeneath}
  ${containRippleWithin}
`;
