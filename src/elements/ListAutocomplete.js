import styled, {css} from 'styled-components';
import {animation, boldText, dimension} from 'src/utils/designtokens';
import {styleText as styleBodyText} from 'src/utils/cssUtilities';

const setDimension = `
  --height: ${dimension.button['minimum target size 100']};
  --border-radius: calc(var(--height) / 2);
  --margin-left: calc(var(--border-radius) / 2);
  --margin-right: calc(var(--border-radius));
  --icon-size: ${dimension.button['minimum target size 75']};
  --icon-vertical-margin: calc( ( var(--height) - var(--icon-size) ) / 2 );
`;

const shapeListItems = `  
  max-width: ${dimension.searchBox['max-width']};
  & li {
    border-radius: var(--border-radius);
    height: var(--height);
    list-style: none;
  }
`;

const positionListItems = `
  & li:not(:first-of-type) {
    margin-top: ${dimension.button['minimum target spacing 100']};
  }
`;

const colorListItems = `
  & li {
    --blur-radius: 8px;
    /* legacy browsers */
    background-color: var(--popup-background-color-fallback);
    /* Modern browsers */
    @supports (backdrop-filter: blur(var(--blur-radius))) {
      background-color: var(--popup-background-color);
      backdrop-filter: blur(var(--blur-radius));  
    } 
  }
  & li svg {
    fill:  var(--popup-text-color);
  }
  & li[data-highlighted="true"] {
    background-color: var(--popup-background-highlighted);
  }
`;

const positionListItemContent = `
  & li {
    padding-right: var(--margin-right);
    position: relative;
  }
  & li p[data-dd-type="icon"] {
    height: 100%;
    position: absolute;
    left: var(--margin-left);
    top: var(--icon-vertical-margin);
    bottom: var(--icon-vertical-margin);  
  } 
  & li p[data-dd-type="icon"] svg {
    height: var(--icon-size);
    width: var(--icon-size);
  }
  & li p,
  & li p[data-dd-type="address"] {
    position: absolute;
    left: calc( var(--margin-left) + var(--icon-size) + 5px); /* 5px is chosen to left-align with search box text OPTICALLY */
  }
  & li p {
    top: 0;
  }
  & li p[data-dd-type="address"] {
    top: 50%;
  }
`;

const truncateText = `
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  overflow: hidden;
}`; // source: https://css-tricks.com/line-clampin/
const styleText = `
  ${styleBodyText}
  & li p,
  & li p[data-dd-type="address"] {
    ${truncateText}
  }
  & b {
    font-family: ${boldText.fontFamily};
    font-weight: ${boldText.fontWeight};
  }
`;

const styleActiveState = css`
  & li {
    position: relative;
    overflow: hidden;
  }
  & li .ripple {
    /* to be used in line 14 of createRipple.js */
    animation: ${animation['ripple 100']} 600ms linear;
    background-color: var(--ripple-color);
    border-radius: 50%;
    position: absolute;
    transform: scale(0);
  }
`;

export const ListAutocomplete = styled.ul`
  ${setDimension}
  ${shapeListItems}
  ${positionListItems}
  ${colorListItems}
  ${positionListItemContent}
  ${styleText}
  ${styleActiveState}
`;
