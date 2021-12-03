import styled from 'styled-components';
import {
  bodyText,
  buttonSquare,
  capHeight,
  dimension,
  duration,
  easing,
} from 'src/utils/designtokens';
import {remify} from 'src/utils/remify';
import {zIndex} from 'src/utils/zIndex';

const placeOverScrim = `
  position: absolute;
  z-index: ${zIndex.divPopup};  
`;

const setFontStyle = `
  font-family: ${bodyText.fontFamily};
  font-size: ${remify(bodyText.fontSize)};
  font-weight: ${bodyText.fontWeight};
  line-height: ${bodyText.lineHeight};
`;
const setTextColor = `
  color: var(--popup-text-color);
  & a {
    color: var(--link-text-color);
  }
`;

const setVerticalSpacing = `
  & h1 + p {
    margin-top: -${remify(bodyText.spaceTop)};
  }
  & p + p {
    margin-top: ${remify(bodyText.spaceBetweenParagraphs)};
  }
  & p + button {
    margin-top: ${remify(capHeight[300] - bodyText.spaceBottom)};
  }
  &[data-placedatapopup="true"] p + button {
    margin-top: ${remify(capHeight[200] - bodyText.spaceBottom)};
  }
`;

const setSize = `
  height: calc(100% - ${dimension.popup['margin 100']});
  top: ${dimension.popup['margin 100']};
  &[data-slide-from="left"] {
    height: 100%;
    right: ${dimension.popup['margin 100']};
    top 0;
    width: calc(100% - ${dimension.popup['margin 100']});  
  }
  &[data-slide-from="right"] {
    height: 100%;
    left: ${dimension.popup['margin 100']};
    top 0;
    width: calc(100% - ${dimension.popup['margin 100']});  
  }
  &[data-slide-from="bottom"] {
    height: 100%; /* calc(100% - ${dimension.popup['margin 100']}); */
    left: 0;
    top: 0; /*${dimension.popup['margin 100']}; */
    width: 100%;
  }
  &[data-placedatapopup="true"] {
    height: 34%;
    left: 0;
    top: 66%;
    width: 100%;
  }
`;

const setBackground = `
  /* legacy browsers */
  background-color: var(--popup-background-color-fallback);
  box-shadow: 
    ${dimension.glow.offset} 
    8px 8px
    var(--popup-glow-color-fallback); 

  /* Modern browsers */
  @supports (backdrop-filter: blur(8px)) {
    background-color: var(--popup-background-color);
    backdrop-filter: blur(8px);  
    box-shadow: 
      ${dimension.glow.offset} 
      8px 8px
      var(--popup-glow-color);
  } 

  /* Firefox and Kai OS */
  @supports (background-image: -moz-element(#map)) and (not (backdrop-filter: blur(8px))) {
    background-color: transparent;
    box-shadow: none;
    /* Blurring the map beneath */
    &::before {
      background-attachment: fixed;
      background-image: -moz-element(#map);
      content: "";
      filter: blur(8px);
      position: absolute;
      left: 0; right: 0; top: 0; bottom: 0;
      z-index: -2;
    }
    /* Applying translucent white on top */
    &::after {
      background-color: var(--popup-background-color);
      box-shadow: 
        ${dimension.glow.offset} 
        8px 8px
        var(--popup-glow-color);
      content: "";
      position: absolute;
      left: 0; right: 0; top: 0; bottom: 0;
      z-index: -1;
    }
  }
`;

const setPadding = `
  padding: 0 10px 10px 10px;
  @media screen and (min-width: ${dimension.breakpoint.divPopup.padding}) {
    padding: 0 ${buttonSquare.clickableArea} ${buttonSquare.clickableArea} ${buttonSquare.clickableArea};
  }
`;

const animateTransition = `
  &[data-slide-from="left"] {
    transform: translateX(-100%);
  }
  &[data-slide-from="right"] {
    transform: translateX(100%);
  }
  &[data-slide-from="bottom"] {
    transform: translateY(100%);
  }
  &[data-hidden='true'] {
    opacity: 0;
    transition: 
      opacity ${duration.menu.exit} ${easing.linear},
      transform ${duration.menu.exit} ${easing.accelerate};
  }
  &[data-hidden='false'] {
    opacity: 1;
    transform: none;
    transition: 
      opcacity ${duration.menu.enter.opacity} ${easing.linear},
      transform ${duration.menu.enter.transform} ${easing.decelerate};
  }
`;

export const DivPopup = styled.div`
  ${placeOverScrim}
  ${setFontStyle}
  ${setTextColor}
  ${setVerticalSpacing}
  ${setSize}
  ${setPadding}
  ${setBackground}
  ${animateTransition}
`;
