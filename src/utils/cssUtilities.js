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

export const stylePopupBackground = () => {
  return `
    --blur-radius: 8px;

    /* legacy browsers */
    background-color: var(--popup-background-color-fallback);
    /* Modern browsers */
    @supports (backdrop-filter: blur(var(--blur-radius))) {
      background-color: var(--popup-background-color);
      backdrop-filter: blur(var(--blur-radius));  
    } 

    /* Firefox and Kai OS */
    @supports (background-image: -moz-element(#map)) and (not (backdrop-filter: blur(var(--blur-radius)))) {
      background-color: transparent;
      /* Blurring the map beneath */
      &::before {
        background-attachment: fixed;
        background-image: -moz-element(#map);
        content: "";
        filter: blur(var(--blur-radius));
        position: absolute;
        left: 0; right: 0; top: 0; bottom: 0;
        z-index: -2;
      }
      /* Applying translucent white on top */
      &::after {
        background-color: var(--popup-background-color);
        box-shadow: ${
          dimension.glow.offset
        } var(--blur-radius) var(--blur-radius) var(--popup-glow-color);
        content: "";
        position: absolute;
        left: 0; right: 0; top: 0; bottom: 0;
        z-index: -1;
      }
    }
    ${blurEdges()}
  `;
};
function blurEdges() {
  return `
    /* legacy browsers */
    box-shadow: ${dimension.glow.offset} var(--blur-radius) var(--blur-radius) var(--popup-glow-color-fallback);
    /* Modern browsers */
    @supports (backdrop-filter: blur(var(--blur-radius))) {
      box-shadow: ${dimension.glow.offset} var(--blur-radius) var(--blur-radius) var(--popup-glow-color);
    } 
    /* Firefox and Kai OS */
    @supports (background-image: -moz-element(#map)) and (not (backdrop-filter: blur(var(--blur-radius)))) {
      box-shadow: none;
      &::after {
        box-shadow: ${dimension.glow.offset} var(--blur-radius) var(--blur-radius) var(--popup-glow-color);
      }
    }
  `;
}
