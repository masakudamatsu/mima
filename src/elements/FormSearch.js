import styled, {css} from 'styled-components';
import {
  animation,
  buttonSquare,
  dimension,
  duration,
  easing,
} from 'src/utils/designtokens';
import {buttonLabel, searchBoxLabel} from 'src/utils/uiCopies';
import {zIndex} from 'src/utils/zIndex';

const placeOverMap = `
  position: absolute;
  z-index: ${zIndex.formSearch};
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
    margin-top: calc(${buttonSquare.clickableArea} + var(--popup-margin) * 2);
  }
  & ul[aria-label="${searchBoxLabel.listbox}"] {
    margin-top: ${dimension.button['minimum target spacing 100']};
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

export const FormSearch = styled.form.attrs({
  role: 'search',
})`
  &[data-searchbox='true'],
  &[data-searchbox='closing'] {
    ${placeOverMap}
    ${setBackground}
    ${setSize}
    ${positionComponents}
    ${animateTransitionIn}
  }
  &[data-searchbox='closing'] {
    ${animateTransitionOut}
  }
`;
