import styled from 'styled-components';
import {bodyText, dimension} from 'src/utils/designtokens';
import {styleFocusRing} from 'src/utils/cssUtilities';

const setDimension = `
  --input-field-height: ${dimension.button['minimum target size 100']};
  --input-field-border-radius: calc(var(--input-field-height) / 2);
`;

const setSize = `
  max-width: ${dimension.searchBox['max-width']};
  width: 100%;
`;

const leftAlignComponents = `
  display: flex;
  flex-direction: column;
  & button,
  & label {
    margin-left: var(--input-field-border-radius);
  }
  & input[type="email"] {
    padding-left: var(--input-field-border-radius);
    padding-right: var(--input-field-border-radius);
  }
`;

const positionComponentsVertically = `
  & button,
  & input[type="email"] {
    margin-top: ${dimension.button['minimum target spacing 100']}
  }
`;

const styleLabelText = `
  color: var(--popup-text-color);
  font-family: ${bodyText.fontFamily};
  & label {
    font-size: 1rem; 
  }
  & button {
    font-size: 1rem;
  }
`;

const shapeInputField = `
  & input[type="email"] {
    height: var(--input-field-height);
    border: ${dimension.searchBox['border width 100']} solid var(--button-label-color-default);
    border-radius: var(--input-field-border-radius);
    width: 100%;
  }
`;

const styleInputText = `
  & input[type="email"] {
    -webkit-appearance: none; /* to prevent Safari from ignoring font-size; see https://css-tricks.com/what-do-you-get-for-using-a-search-input-type/*/
    color: var(--popup-text-color);
    font-family: ${bodyText.fontFamily};
    font-size: 1rem;
  }
  & input[type="email"]::placeholder {
    color: var(--popup-text-color);
    opacity: 0.5; /* to override the default of Firefox */
  }
`;

const styleInputFocusState = `
  & input[type="email"]:focus {
    ${styleFocusRing}
  }
`;

export const FormLogin = styled.form`
  ${setDimension}
  ${setSize}
  ${leftAlignComponents}
  ${positionComponentsVertically}
  ${styleLabelText}
  ${shapeInputField}
  ${styleInputText}
  ${styleInputFocusState}
`;
