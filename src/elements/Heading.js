import styled from 'styled-components';
import {dimension, heading} from 'src/utils/designtokens';
import {remify} from 'src/utils/remify';

export const Heading = styled.h1`
  font-family: ${heading.fontFamily};
  font-size: ${remify(heading.fontSize.wideScreen)};
  font-weight: ${heading.fontWeight};
  line-height: ${heading.lineHeight.wideScreen};
  padding-bottom: ${remify(heading.paddingBottom.wideScreen)};
  padding-top: ${remify(heading.paddingTop.wideScreen)};
  &[data-editor],
  &[data-address-editor] {
    font-size: ${remify(heading.fontSize.narrowScreen)};
    line-height: ${heading.lineHeight.narrowScreen};
    padding-bottom: ${remify(heading.paddingBottom.narrowScreen)};
    padding-top: ${remify(heading.paddingTop.narrowScreen)};
  }
  &[data-editor] {
    @media screen and (min-width: ${dimension.breakpoint.divPopup.padding}) {
      font-size: ${remify(heading.fontSize.wideScreen)};
      line-height: ${heading.lineHeight.wideScreen};
      padding-bottom: ${remify(heading.paddingBottom.wideScreen)};
      padding-top: ${remify(heading.paddingTop.wideScreen)};
    }
  }
  &[data-address-editor] {
    border-top: 1px solid var(--button-outline-color);
    margin-top: 10px;
  }
`;
