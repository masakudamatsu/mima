import styled from 'styled-components';
// import PropTypes from 'prop-types';
import {dimension, heading} from 'src/utils/designtokens';
import {remify} from 'src/utils/remify';

export const Heading = styled.h1`
  font-family: ${heading.fontFamily};
  font-size: ${remify(heading.fontSize.wideScreen)};
  font-weight: ${heading.fontWeight};
  line-height: ${heading.lineHeight.wideScreen};
  padding-bottom: ${remify(heading.paddingBottom.wideScreen)};
  padding-top: ${remify(heading.paddingTop.wideScreen)};
  &[data-editor] {
    font-size: ${remify(heading.fontSize.narrowScreen)};
    line-height: ${heading.lineHeight.narrowScreen};
    padding-bottom: ${remify(heading.paddingBottom.narrowScreen)};
    padding-top: ${remify(heading.paddingTop.narrowScreen)};
    @media screen and (min-width: ${dimension.breakpoint.divPopup.padding}) {
      font-size: ${remify(heading.fontSize.wideScreen)};
      line-height: ${heading.lineHeight.wideScreen};
      padding-bottom: ${remify(heading.paddingBottom.wideScreen)};
      padding-top: ${remify(heading.paddingTop.wideScreen)};
    }
  }
`;

// Heading.propTypes = {};
