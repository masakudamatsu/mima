import styled from 'styled-components';
// import PropTypes from 'prop-types';
import {bodyText} from 'src/utils/designtokens';
import {remify} from 'src/utils/remify';

export const Paragraph = styled.p`
  font-family: ${bodyText.fontFamily};
  font-size: ${remify(bodyText.fontSize)};
  font-weight: ${bodyText.fontWeight};
  line-height: ${bodyText.lineHeight};
`;

Paragraph.Wrapper = styled.div`
  & p + p {
    margin-top: ${remify(bodyText.spaceBetweenParagraphs)};
  }
`;
// Paragraph.propTypes = {};