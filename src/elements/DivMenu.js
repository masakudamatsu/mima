import styled from 'styled-components';
import {bodyText} from 'src/utils/designtokens';
import {remify} from 'src/utils/remify';

export const DivMenu = styled.div`
  padding: ${remify(2 * bodyText.wordSpacing)};
`;
