import styled from 'styled-components';
import {dimension} from 'src/utils/designtokens';
import {styleText} from 'src/utils/cssUtilities';

const setDimension = `
  --border-radius: calc(${dimension.button['minimum target size 100']} / 2);
  --margin-side: calc(var(--border-radius));
`;

const shapeAlertBox = `  
  max-width: ${dimension.searchBox['max-width']};
`;

const positionText = `
  & p {
    padding: var(--margin-side);  
  }
`;

export const DivAlertSearch = styled.div`
  ${styleText}
  ${setDimension}
  ${shapeAlertBox}
  ${positionText}
`;
