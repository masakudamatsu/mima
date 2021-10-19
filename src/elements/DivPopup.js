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
  }
  &[data-darkmode='true'] {
    --popup-background-color: ${color['mid-grey 80']};
    --popup-shadow-color: ${color['mid-grey 42']};
  }
`;

const DivPopup = styled.div`
  ${placeOverScrim}
  ${setColorScheme}
  background: var(--popup-background-color);
  box-shadow: 0 0 ${dimension['margin 66']} ${dimension['margin 66']}
      var(--popup-shadow-color),
    0 0 ${dimension['margin 100']} ${dimension['margin 66']}
      var(--popup-shadow-color),
    0 0 ${dimension['margin 133']} ${dimension['margin 66']}
      var(--popup-shadow-color);
  height: calc(100% - ${dimension['margin 200']});
  text-align: center;
  top: ${dimension['margin 100']};
  left: ${dimension['margin 100']};
  right: ${dimension['margin 100']};
  bottom: ${dimension['margin 100']};
  width: calc(100% - ${dimension['margin 200']});
`;

// DivPopup.propTypes = {};
export default DivPopup;
