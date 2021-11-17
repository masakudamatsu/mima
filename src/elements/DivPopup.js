import styled from 'styled-components';
// import PropTypes from 'prop-types';
import {
  bodyText,
  dimension,
  duration,
  easing,
  popup,
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
`;

const setSize = `
  height: calc(100% - ${dimension.popup['margin 100']});
  top: ${dimension.popup['margin 100']};
  &[data-slide-from="left"] {
    right: ${dimension.popup['margin 100']};
    width: calc(100% - ${dimension.popup['margin 100']});  
  }
  &[data-slide-from="right"] {
    left: ${dimension.popup['margin 100']};
    width: calc(100% - ${dimension.popup['margin 100']});  
  }
  &[data-slide-from="bottom"] {
    left: ${dimension.popup['margin 100']};
    right: ${dimension.popup['margin 100']};
    width: calc(100% - ${dimension.popup['margin 200']});  
  }
  &[data-height="one-third"] {
    height: 34%;
    top: 66%;
  }
`;

const setBackground = `
  background: var(--popup-background-color);
  box-shadow: 0 0 ${popup.blurRadius['layer 1']}
      ${popup.spreadRadius} var(--popup-shadow-color),
    0 0 ${popup.blurRadius['layer 2']} ${popup.spreadRadius}
      var(--popup-shadow-color),
    0 0 ${popup.blurRadius['layer 3']} ${popup.spreadRadius}
      var(--popup-shadow-color);
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
  ${setSize}
  ${setBackground}
  ${animateTransition}
`;

// DivPopup.propTypes = {};
