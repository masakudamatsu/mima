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
const centerAlignContent = `
  /* "& > div" for searched and saved place info popup */
  /* "& > form" for text editor */
  & > div,
  & > form {
    margin: 0 auto;
    max-width: ${dimension.searchBox['max-width']};
  }
`;
const positionErrorMessage = `
  &[role="alertdialog"] {
    align-items: center;
    display: flex;
    justify-content: center;  
  }
  &[role="alertdialog"] div {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: center;  
  }
  &[role="alertdialog"] p {
    width: 100%; /* remove the space for the top-right close button */
  }
`;
const positionComponents = `
  ${positionCloseButton}
  ${positionOtherButtons}
  ${centerAlignContent}
  & h2,
  & p {
    --close-button-width: calc(${
      dimension.button['minimum target size 100']
    } + ${dimension.button['minimum target spacing 100']} * 2);
    width: calc(100% - var(--close-button-width));    
  }
  ${positionErrorMessage}

  /* vertical spacing */
  & h2 {
    padding-bottom: ${remify(h2PlaceName.paddingBottom)};
    padding-top: ${remify(h2PlaceName.paddingTop)};
  }
  & p:first-of-type {
    margin-top: -${remify(bodyText.spaceTop)};
  }
  & p + p,
  & p[data-address] {
      margin-top: ${remify(bodyText.spaceBetweenParagraphs)};
  }
  & div + button,
    p + button,
    p + div[data-buttons-row] {
    margin-top: ${remify(capHeight[200] - bodyText.spaceBottom)};
  }
  & div[data-buttons-row] + button {
    margin-top: ${dimension.button['minimum target spacing 100']}
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

const handleOverflow = `
  overflow: auto;
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

const showPlaceholderTextInEditor = css`
  /* Docs: https://tiptap.dev/api/extensions/placeholder#additional-setup */
  & .ProseMirror h2.is-empty::before,
  & .ProseMirror p.is-empty:first-of-type::before {
    color: var(--placeholder-text-color);
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
`;

const styleTextEditor = css`
  /* Remove the browser's default focus-ring */
  & .ProseMirror:focus-visible {
    outline-style: none;
  }
`;
export const DivPlaceInfoBackground = styled.div`
  ${setBackground}
  ${setInnerSize}
  ${setPadding}
  ${positionComponents}
  ${setFontStyle}
  ${handleOverflow}
  ${animateTransitionIn}
  ${animateTransitionOut}
  ${showPlaceholderTextInEditor}
  ${styleTextEditor}
`;

DivPlaceInfoBackground.Wrapper = styled.div`
  ${placeOverMap}
  ${setOuterSize}
  ${revealMapBeneath}
  ${containRippleWithin}
`;
