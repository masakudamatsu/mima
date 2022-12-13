import styled, {css} from 'styled-components';
import {stylePopupBackground} from 'src/utils/cssUtilities';
import {
  animation,
  buttonCircle,
  dimension,
  duration,
  easing,
} from 'src/utils/designtokens';
import {buttonLabel, searchBoxLabel} from 'src/utils/uiCopies';
import {zIndex} from 'src/utils/zIndex';

const placeOverMap = `
  position: absolute;
  z-index: ${zIndex.divSearchBackground};
`;

const setBackground = stylePopupBackground();

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
    z-index: ${zIndex.closeButton};  
  }
  & div[id="searchbox"],
  & ul[aria-label="${searchBoxLabel.listbox}"] {
    margin: 0 auto; 
    width: calc(100% - var(--popup-margin) * 2) ;
    z-index: ${zIndex.divSearch};      
  }
  & div[id="searchbox"] {
    margin-top: calc(${buttonCircle.clickableArea} + var(--popup-margin) * 2);
  }
  & ul[aria-label="${searchBoxLabel.listbox}"] {
    margin-top: ${dimension.button['minimum target spacing 100']};
  }
`;

const animateTransitionIn = css`
  animation-delay: 0ms, 90ms;
  animation-duration: 300ms, 210ms;
  animation-fill-mode: backwards;
  animation-name: ${animation.searchBox}, ${animation.fadeIn};
  animation-timing-fiunction: ${easing.standard}, ${easing.decelerate};
  transform-origin: top right;
`;

const animateTransitionOut = css`
  &[data-closing='true'] {
    animation-duration: ${duration.modal.exit}ms;
    animation-name: ${animation.fadeOut};
    animation-fill-mode: forwards;
  }
`;

export const DivSearchBackground = styled.div`
  ${placeOverMap}
  ${setBackground}
  ${setSize}
  ${positionComponents}
  ${animateTransitionIn}
  ${animateTransitionOut}
`;
