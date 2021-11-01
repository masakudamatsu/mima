import styled from 'styled-components';
// import PropTypes from 'prop-types';
import {color, duration, easing} from 'src/utils/designtokens';
import {zIndex} from 'src/utils/zIndex';

const placeOverScrim = `
  position: absolute;
  z-index: ${zIndex.divPopup};  
`;

const dimension = {
  'margin 66': `16px`,
  'margin 100': `24px`,
  'margin 133': `32px`,
  'margin 200': `48px`,
};

const setColorScheme = `
  &[data-darkmode='false'] {
    --popup-background-color: ${color['white 93']};
    --popup-shadow-color: ${color['white 63']};
    --popup-text-color: ${color['dark-grey 100']};
    --popup-button-text-color: ${color['google-blue 100']};
  }
  &[data-darkmode='true'] {
    --popup-background-color: ${color['mid-grey 80']};
    --popup-shadow-color: ${color['mid-grey 42']};
    --popup-text-color: ${color['off-white 100']};
    --popup-button-text-color: ${color['google-blue-light 100']};
  }
`;

const setTextColor = `
  color: var(--popup-text-color);
  & button {
    color: var(--popup-button-text-color);
  }
`;

const setSize = `
  bottom: ${dimension['margin 100']};
  &[data-slide-from="left"] {
    height: calc(100% - ${dimension['margin 200']});
    right: ${dimension['margin 100']};
    top: ${dimension['margin 100']};
    width: calc(100% - ${dimension['margin 100']});  
  }
  &[data-slide-from="right"] {
    height: calc(100% - ${dimension['margin 200']});
    left: ${dimension['margin 100']};
    top: ${dimension['margin 100']};
    width: calc(100% - ${dimension['margin 100']});  
  }
  &[data-slide-from="top"] {
    height: calc(100% - ${dimension['margin 100']});
    left: ${dimension['margin 100']};
    right: ${dimension['margin 100']};
    width: calc(100% - ${dimension['margin 200']});  
  }
`;

const animateTransition = `
  &[data-slide-from="left"] {
    transform: translateX(-100%);
  }
  &[data-slide-from="right"] {
    transform: translateX(100%);
  }
  &[data-slide-from="top"] {
    transform: translateY(-100%);
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
  ${setColorScheme}
  ${setTextColor}
  ${setSize}
  ${animateTransition}
  background: var(--popup-background-color);
  box-shadow: 0 0 ${dimension['margin 66']} ${dimension['margin 66']}
      var(--popup-shadow-color),
    0 0 ${dimension['margin 100']} ${dimension['margin 66']}
      var(--popup-shadow-color),
    0 0 ${dimension['margin 133']} ${dimension['margin 66']}
      var(--popup-shadow-color);
`;

// DivPopup.propTypes = {};
