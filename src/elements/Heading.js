import styled from 'styled-components';
// import PropTypes from 'prop-types';
import {heading} from 'src/utils/designtokens';
import {remify} from 'src/utils/remify';

export const Heading = styled.h1`
  font-family: ${heading.fontFamily};
  font-size: ${remify(heading.fontSize)};
  font-weight: ${heading.fontWeight};
  line-height: ${heading.lineHeight};
`;

// Heading.propTypes = {};
