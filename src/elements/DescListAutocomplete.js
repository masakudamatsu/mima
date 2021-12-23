import styled from 'styled-components';
import {
  bodyText,
  buttonSquare,
  color,
  dimension,
  svgPlace,
} from 'src/utils/designtokens';

const closeButtonHeight = buttonSquare.clickableArea;
const searchBoxHeight = `2 * ${dimension.searchBox['border width 100']} + ${dimension.button['minimum target size 100']}`;
const spaceAboveList = dimension.button['minimum target spacing 100'];
const positionList = `
  left: ${dimension.searchBox['side margin 100']};
  position: absolute;
  right: ${dimension.searchBox['side margin 100']};
  top: calc(${closeButtonHeight} + ${searchBoxHeight} + ${spaceAboveList});
`;

const shapeListItems = `  
  & div {
    height: ${dimension.button['minimum target size 100']};
  }
`;

const positionListItems = `
  & div:not(:first-of-type) {
    margin-top: ${dimension.button['minimum target spacing 100']};
  }
`;

const colorListItems = `
  & div {
    background-color: ${color['white 93']};
  }
`;

const positionListItemContent = `
  & div {
    align-items: center;
    display: grid;
    grid-column-gap: ${dimension.button['minimum target spacing 100']};
    grid-template-columns: ${svgPlace.widthInner} 1fr;
    grid-template-rows: 50% 50%;
    padding: 0 ${dimension.button['minimum target spacing 100']};
  }
  & div dd[data-dd-type="icon"] {
    grid-column: 1 / span 1;
    grid-row: 1 / span 2;
  }
  & div dt {
    grid-column: 2 / span 1;
    grid-row: 1 / span 1;
  }
  & div dd[data-dd-type="address"] {
    grid-column: 2 / span 1;
    grid-row: 2 / span 1;
  }
`;

const truncateText = `
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  overflow: hidden;
}`; // source: https://css-tricks.com/line-clampin/
const styleText = `
  font-family: ${bodyText.fontFamily};
  font-size: 1rem;
  & div dt,
  & div dd[data-dd-type="address"] {
    ${truncateText}
  }
`;

export const DescListAutocomplete = styled.dl`
  ${positionList}
  ${shapeListItems}
  ${positionListItems}
  ${colorListItems}
  ${positionListItemContent}
  ${styleText}
`;
