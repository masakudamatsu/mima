import styled from 'styled-components';
// import PropTypes from 'prop-types';
import {bodyText, capHeight, color, dimension} from 'src/utils/designtokens';
import {remify} from 'src/utils/remify';

export const DivErrorDialog = styled.div`
  & h1 + p {
    margin-top: -${remify(bodyText.spaceTop)};
  }
  & p + p {
    margin-top: ${remify(bodyText.spaceBetweenParagraphs)};
  }
  & p + button {
    margin-top: ${remify(capHeight[300] - bodyText.spaceBottom)};
  }
`;
// DivErrorDialog.propTypes = {};
