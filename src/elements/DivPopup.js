import styled from 'styled-components';
// import PropTypes from 'prop-types';
import {color} from 'src/utils/designtokens';
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

const setFontScheme = `
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
`;

const setLayout = `
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const setTextColor = `
  color: var(--popup-text-color);
  & button {
    color: var(--popup-button-text-color);
  }
`;

export const DivPopup = styled.div`
  ${setFontScheme}
  ${setLayout}
  ${placeOverScrim}
  ${setColorScheme}
  ${setTextColor}
  background: var(--popup-background-color);
  box-shadow: 0 0 ${dimension['margin 66']} ${dimension['margin 66']}
      var(--popup-shadow-color),
    0 0 ${dimension['margin 100']} ${dimension['margin 66']}
      var(--popup-shadow-color),
    0 0 ${dimension['margin 133']} ${dimension['margin 66']}
      var(--popup-shadow-color);
  height: calc(100% - ${dimension['margin 200']});
  top: ${dimension['margin 100']};
  left: ${dimension['margin 100']};
  right: ${dimension['margin 100']};
  bottom: ${dimension['margin 100']};
  width: calc(100% - ${dimension['margin 200']});
`;

// DivPopup.propTypes = {};
