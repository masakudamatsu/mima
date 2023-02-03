import styled from 'styled-components';
import {bodyText, dimension} from 'src/utils/designtokens';

const setDimension = `
  --height: ${dimension.button['minimum target size 200']};
  --border-radius: calc(${dimension.button['minimum target size 100']} / 2);
  --margin-side: calc(var(--border-radius));
`;

const shapeAlertBox = `  
  max-width: ${dimension.searchBox['max-width']};
  & p {
    border-radius: var(--border-radius);
    height: var(--height);
  }
`;

const positionAlertBox = `
  & p {
    margin-top: ${dimension.button['minimum target spacing 100']};
  }
`;

const colorAlertBox = `
  & p {
    color: var(--popup-text-color);

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

const styleText = `
  & p {
    font-family: ${bodyText.fontFamily};
    font-size: 1rem;
    padding: var(--margin-side);  
  }
`;

export const DivAlertSearch = styled.div`
  ${setDimension}
  ${shapeAlertBox}
  ${positionAlertBox}
  ${colorAlertBox}
  ${styleText}
`;
