import styled from 'styled-components';
// import PropTypes from 'prop-types';
import {bodyText} from 'src/utils/designtokens';
import {remify} from 'src/utils/remify';

export const DivErrorDialog = styled.div`
  & p + p {
    margin-top: ${remify(bodyText.spaceBetweenParagraphs)};
  }
  & h1 + p {
    margin-top: -${remify(bodyText.spaceTop)};
  }
`;
// DivErrorDialog.propTypes = {};
