import styled from 'styled-components';
import {dimension} from 'src/utils/designtokens';

const createRowOfButtons = `
  align-items: center;
  display: flex;
`;
const leaveSpaceBetweenButtons = `
  & button + button,
  & a + button,
  & button + a,
  & a + a {
    margin-left: ${dimension.button['minimum target spacing 100']};
  }
`;

export const DivButtonsRow = styled.div`
  ${createRowOfButtons}
  ${leaveSpaceBetweenButtons}
`;
