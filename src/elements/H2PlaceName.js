import styled from 'styled-components';
import {h2PlaceName} from 'src/utils/designtokens';
import {remify} from 'src/utils/remify';

export const H2PlaceName = styled.h2`
  font-family: ${h2PlaceName.fontFamily};
  font-size: ${remify(h2PlaceName.fontSize)};
  font-weight: ${h2PlaceName.fontWeight};
  line-height: ${h2PlaceName.lineHeight};
  padding-bottom: ${remify(h2PlaceName.paddingBottom)};
  padding-top: ${remify(h2PlaceName.paddingTop)};
`;
