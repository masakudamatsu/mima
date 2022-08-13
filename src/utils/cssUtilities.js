import {dimension} from './designtokens';
export const styleFocusRing = `
  border-color: var(--button-shadow-color-focus);
  box-shadow: ${dimension.glow['offset']} var(--button-shadow-blur-radius-focus) var(--button-shadow-color-focus);
  /* remove the default focus ring & fallback for Forced Color Modes (https://www.sarasoueidan.com/blog/focus-indicators/#tips-for-styling-focus-indicators) */
  outline: 1px solid transparent; 
`;
export const removeFocusRing = `
  border-style: none;
  box-shadow: none;
`;
