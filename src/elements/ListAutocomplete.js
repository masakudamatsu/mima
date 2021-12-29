import styled from 'styled-components';
import {
  bodyText,
  boldText,
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
  & li {
    height: ${dimension.button['minimum target size 100']};
  }
`;

const positionListItems = `
  & li:not(:first-of-type) {
    margin-top: ${dimension.button['minimum target spacing 100']};
  }
`;

const colorListItems = `
  & li {
    background-color: ${color['white 93']};
  }
`;

const positionListItemContent = `
  & li dl {
    align-items: center;
    display: grid;
    grid-column-gap: ${dimension.button['minimum target spacing 100']};
    grid-template-columns: ${svgPlace.widthInner} 1fr;
    grid-template-rows: 50% 50%;
    padding: 0 ${dimension.button['minimum target spacing 100']};
  }
  & li dl dd[data-dd-type="icon"] {
    grid-column: 1 / span 1;
    grid-row: 1 / span 2;
  }
  & li dl dt {
    grid-column: 2 / span 1;
    grid-row: 1 / span 1;
  }
  & li dl dd[data-dd-type="address"] {
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
  & li dl dt,
  & li dl dd[data-dd-type="address"] {
    ${truncateText}
  }
  & b {
    font-family: ${boldText.fontFamily};
    font-weight: ${boldText.fontWeight};
  }
`;

export const ListAutocomplete = styled.ul`
  ${positionList}
  ${shapeListItems}
  ${positionListItems}
  ${colorListItems}
  ${positionListItemContent}
  ${styleText}
`;
