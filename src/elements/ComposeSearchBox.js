import styled from 'styled-components';
import {dimension} from 'src/utils/designtokens';
import {styleFocusRing, styleText} from 'src/utils/cssUtilities';

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
  max-width: ${dimension.searchBox['max-width']}; 

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
    -webkit-appearance: none; /* to prevent Safari from ignoring font-size; see https://css-tricks.com/what-do-you-get-for-using-a-search-input-type/*/
    ${styleText}
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
    ${styleFocusRing}
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

export const ComposeSearchBox = styled.div`
  ${setDimension}
  ${shapeBox}
  ${positionComponents}
  ${placeIconBelowSearchbox}
  ${styleSearchboxText}
  ${styleSearchIcon}
  ${styleFocusState}
`;
