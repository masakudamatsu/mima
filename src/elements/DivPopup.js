import styled from 'styled-components';
// import PropTypes from 'prop-types';
import {
  bodyText,
  buttonSquare,
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
  & a {
    color: var(--link-text-color);
  }
`;

const setSize = `
  border-top-left-radius: ${dimension['border radius 100']};
  border-top-right-radius: ${dimension['border radius 100']};
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
  /* Firefox */
  background: var(--popup-background-color-firefox);
  box-shadow: 
  ${dimension.glow.offset} 
  8px 8px
  var(--popup-glow-color-firefox);
  /* Other modern browsers */
  @supports (backdrop-filter: blur(8px)) {
    background: var(--popup-background-color);
    backdrop-filter: blur(8px);  
    box-shadow: 
    ${dimension.glow.offset} 
    8px 8px
    var(--popup-glow-color);
  } 
`;

const setPadding = `
  padding: calc(${buttonSquare.clickableArea} - ${popup.spreadRadius});
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
  ${setPadding}
  ${setBackground}
  ${animateTransition}
`;

// DivPopup.propTypes = {};
