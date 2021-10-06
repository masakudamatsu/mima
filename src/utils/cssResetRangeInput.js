export const resetRangeInput = `
  /* See https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/#applying-base-css-styles */
  input[type='range'] {
    /* Hides the slider so that custom slider can be made */
    -webkit-appearance: none;
    /* Remove white background in Chrome */
    background: transparent;
    /* "width: 100%;" (for Firefox which requires a specific width) is removed as it will override the custom-style (for unknown reason) */
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  input[type='range']:focus {
    /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
    outline: none;
  }

  input[type='range']::-ms-track {
    cursor: pointer;
    /* Hides the slider so custom styles can be added */
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
`;
