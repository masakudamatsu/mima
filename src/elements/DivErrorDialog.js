import styled from 'styled-components';
// import PropTypes from 'prop-types';
import {bodyText} from 'src/utils/designtokens';
import {remify} from 'src/utils/remify';

export const DivErrorDialog = styled.div`
  font-family: ${bodyText.fontFamily};
  font-size: ${remify(bodyText.fontSize)};
  font-weight: ${bodyText.fontWeight};
  line-height: ${bodyText.lineHeight};
  & p + p {
    margin-top: ${remify(bodyText.spaceBetweenParagraphs)};
  }
  & h1 + p {
    margin-top: -${remify(bodyText.spaceTop)};
  }
`;
// DivErrorDialog.propTypes = {};
