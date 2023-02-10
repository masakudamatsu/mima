import styled from 'styled-components';
import {dimension} from 'src/utils/designtokens';
import {styleText} from 'src/utils/cssUtilities';

const setDimension = `
  --border-radius: calc(${dimension.button['minimum target size 100']} / 2);
  --margin-side: calc(var(--border-radius));
`;

const shapeAlertBox = `  
  max-width: ${dimension.searchBox['max-width']};
  & p {
    border-radius: var(--border-radius);
  }
`;

const positionAlertBox = `
  & p {
    margin-top: ${dimension.button['minimum target spacing 100']};
  }
`;

const colorAlertBox = `
  & p {
    --blur-radius: 8px;
    /* legacy browsers */
    background-color: var(--popup-background-color-fallback);
    /* Modern browsers */
    @supports (backdrop-filter: blur(var(--blur-radius))) {
      background-color: var(--popup-background-color);
      backdrop-filter: blur(var(--blur-radius));  
    } 
  }
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
  ${positionAlertBox}
  ${colorAlertBox}
  ${positionText}
`;
