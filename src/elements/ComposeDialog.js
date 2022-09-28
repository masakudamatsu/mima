import styled, {css} from 'styled-components';
import {stylePopupBackground} from 'src/utils/cssUtilities';
import {
  animation,
  bodyText,
  capHeight,
  dimension,
  duration,
  easing,
  h2PlaceName,
} from 'src/utils/designtokens';
import {buttonLabel} from 'src/utils/uiCopies';
import {remify} from 'src/utils/remify';
import {zIndex} from 'src/utils/zIndex';

const setDimension = `
  --height: 34%;
`;

const setSize = `
  height: var(--height);
  width: 100%;
`;

const setBackground = stylePopupBackground({withEdges: true});

const placeOverMap = `
  position: absolute;
  left: 0;
  top: calc(100% - var(--height));
  z-index: ${zIndex.divPopup};
`;

const styleText = `
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

const positionComponents = `
  --popup-margin: ${dimension.button['minimum target spacing 100']};

  & button[aria-label="${buttonLabel.closePlaceDetail}"] {
    position: absolute;
    right: var(--popup-margin);
    top:  var(--popup-margin);
    z-index: ${zIndex.closeButton};  
  }

  /* horizontal spacing */
  & h2,
  & p,
  & button:not([aria-label="${buttonLabel.closePlaceDetail}"]) {
    margin-left: var(--popup-margin); 
  }
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

const animateTransitionIn = css`
  animation-duration: ${duration.modal.enter}ms;
  animation-fill-mode: backwards;
  animation-name: ${animation.fadeIn};
  animation-timing-fiunction: ${easing.linear};
`;

const animateTransitionOut = css`
  animation-duration: ${duration.modal.exit}ms;
  animation-name: ${animation.fadeOut};
  animation-fill-mode: forwards;
`;

export const ComposeDialog = styled.div`
  ${setDimension}
  ${styleText}
  ${setSize}
  ${setBackground}
  ${placeOverMap}
  ${positionComponents}
  ${animateTransitionIn}
  &[data-closing='true'] {
    ${animateTransitionOut}
  }
`;
