import styled from 'styled-components';

import {bodyText, capHeight} from 'src/utils/designtokens';
import {remify} from 'src/utils/remify';

export const DivParagraphHolder = styled.div`
  & p:first-of-type {
    margin-top: -${remify(bodyText.spaceTop)};
  }
  & p + p {
    margin-top: ${remify(bodyText.spaceBetweenParagraphs)};
  }
  & p:last-of-type {
    margin-bottom: ${remify(capHeight[200] - bodyText.spaceBottom)};
  }
`;
