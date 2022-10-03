import styled from 'styled-components';
import {stylePopupBackground} from 'src/utils/cssUtilities';

const setBackground = stylePopupBackground();

export const ComposeLoginPage = styled.div`
  height: 100%;
  ${setBackground}
`;
