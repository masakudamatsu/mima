import styled from 'styled-components';
import {buttonSquare, dimension} from 'src/utils/designtokens';
import {zIndex} from 'src/utils/zIndex';

const setSize = `
  height: calc(2 * ${dimension.searchBox['border width 100']} + ${dimension.button['minimum target size 100']});
  max-width: 584px; /* follow google.com */
`;

const centerAlignOverMap = `
  left: ${dimension.searchBox['side margin 100']};
  margin: 0 auto; /* for center-alignment once width hits max-width */
  position: absolute;
  right: ${dimension.searchBox['side margin 100']};
  z-index: ${zIndex.divSearch};
`;

const leaveSpaceForCloseButton = `
  top: ${buttonSquare.clickableArea};
`;

const alignContent = `
  display: flex;
  padding-right: ${dimension.button['minimum target size 100']};
  padding-left: calc(${dimension.button['minimum target size 100']} / 2);
  & input[type='search'] {
    height: 100%; /* ensuring the cursor vertically center-aligned */
    width: 100%; /* otherwise the magnifying glass will be located around the center */
  }
`;

const drawBorder = `
  border: ${dimension.searchBox['border width 100']} solid var(--button-label-color-default);
  border-radius: calc(${dimension.button['minimum target size 100']} / 2);
  &:focus-within {
    border-color: var(--button-label-color-focus);
  }
`;

export const DivSearchBoxWrapper = styled.div`
  ${setSize}
  ${centerAlignOverMap}
  ${leaveSpaceForCloseButton}
  ${drawBorder}
  ${alignContent}
`;
