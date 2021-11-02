import styled from 'styled-components';
// import PropTypes from 'prop-types';
import {bodyText, capHeight, color, dimension} from 'src/utils/designtokens';
import {remify} from 'src/utils/remify';

const setColorScheme = `
  &[data-darkmode='false'] {  
    --button-color: ${color['google-blue 100']};
  }
  &[data-darkmode='true'] {
    --button-color: ${color['google-blue-light 100']};
  }
`;

export const DivErrorDialog = styled.div`
  font-family: ${bodyText.fontFamily};
  font-size: ${remify(bodyText.fontSize)};
  font-weight: ${bodyText.fontWeight};
  line-height: ${bodyText.lineHeight};
  & h1 + p {
    margin-top: -${remify(bodyText.spaceTop)};
  }
  & p + p {
    margin-top: ${remify(bodyText.spaceBetweenParagraphs)};
  }
  & p + button {
    margin-top: ${remify(capHeight[300] - bodyText.spaceBottom)};
  }
  & button {
    color: var(--button-color);
  }
  ${setColorScheme}
`;
// DivErrorDialog.propTypes = {};
