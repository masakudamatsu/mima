import styled from 'styled-components';
import {bodyText, buttonSquare, dimension} from 'src/utils/designtokens';
import {zIndex} from 'src/utils/zIndex';

const setDimension = `
  --box-height: ${dimension.button['minimum target size 100']};
  --border-radius: calc(var(--box-height) / 2);
  --border-width: ${dimension.searchBox['border width 100']};
  --icon-size: ${dimension.button['minimum target size 75']};
  --icon-left-margin: calc(var(--border-radius) / 2);
  --icon-vertical-margin: calc( ( var(--box-height) - var(--icon-size) ) / 2 );
`;

const shapeBox = `
  height: var(--box-height);
  max-width: 561px; /* follow google.com */

  & input[type="search"] {
    border: var(--border-width) solid var(--button-label-color-default);
    border-radius: var(--border-radius);
    height: 100%;
    width: 100%;
  }
`;

const positionComponents = `
  position: relative;

  & svg {
    height: var(--icon-size);
    width: var(--icon-size);
    position: absolute;
    left: var(--icon-left-margin);
    top: var(--icon-vertical-margin);
    bottom: var(--icon-vertical-margin);  
  }

  & input[type="search"] {
    padding-left: calc( var(--icon-left-margin) + var(--icon-size) + 4px); /* 4px is chosen to make side margins OPTICALLY equal */
    padding-right: var(--border-radius);
  }
`;

const placeIconBelowSearchbox = `
  /* Ensuring that tapping the icon focuses the search box */
  & svg {
    z-index: -1;
  }
  & input[type="search"] {
    background: transparent;
  }  
`;

const styleSearchboxText = `
  & input[type="search"] {
    color: var(--popup-text-color);
    font-family: ${bodyText.fontFamily};
    font-size: 1rem;
  }
  & input[type="search"]::placeholder {
    color: var(--popup-text-color);
    opacity: 1; /* to override the default of Firefox */
  }  
`;

const styleSearchIcon = `
  & svg {
    fill: var(--button-label-color-default);
  }
`;

const styleFocusState = `
  & input[type="search"]:focus {
    border-color: var(--button-shadow-color-focus);
    box-shadow: ${dimension.glow['offset']} var(--button-shadow-blur-radius-focus) var(--button-shadow-color-focus);
  }
`;

// TODO #203
// const styleDeleteButton = `
//   & input[type="search"]::-webkit-search-cancel-button {
//   /* Remove default */
//   -webkit-appearance: none;
//   /* Now your own custom styles */
//   background-image: var(--delete-button);
//   height: calc( var(--box-height) / 2 );
//   width: calc( var(--box-height) / 2 );
// }
// `;

// TODO: move the following to <SearchForm>
const centerAlignOverMap = `
  left: ${dimension.searchBox['side margin 100']};
  margin: 0 auto; /* for center-alignment once width hits max-width */
  right: ${dimension.searchBox['side margin 100']};
  top: ${buttonSquare.clickableArea};
  z-index: ${zIndex.divSearch};
`;

export const ComposeSearchBox = styled.div`
  ${setDimension}
  ${shapeBox}
  ${positionComponents}
  ${placeIconBelowSearchbox}
  ${styleSearchboxText}
  ${styleSearchIcon}
  ${styleFocusState}
  ${centerAlignOverMap}
`;
