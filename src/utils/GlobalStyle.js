import {createGlobalStyle} from 'styled-components';
import {map} from 'src/utils/designtokens';

const GlobalStyle = createGlobalStyle`
/******************* Self-hosted fonts *********************/

/* Example:
  @font-face {
    font-family: 'Reforma 1918 Gris Italica';
    src: url('fonts/Reforma1918-GrisItalica.eot') format('embedded-opentype'), /* IE8 or earlier */
        url('fonts/Reforma1918-GrisItalica-subset.woff2') format('woff2'), /* Super Modern Browsers */
        url('fonts/Reforma1918-GrisItalica-subset-zopfli.woff') format('woff'), /* Modern Browsers */
        url('fonts/Reforma1918-GrisItalica-subset.ttf') format('truetype');	 /* Safari, Android, iOS */
    font-style: italic;
    font-weight: 500;
    text-rendering: optimizeLegibility;
    font-display: swap;
  }
*/

/******************** CSS Reset ************************/

/*!
 * ress.css • v4.0.0
 * MIT License
 * github.com/filipelinhares/ress
 */

/* # =================================================================
   # Global selectors
   # ================================================================= */

html {
  box-sizing: border-box;
  -webkit-text-size-adjust: 100%; /* Prevent adjustments of font size after orientation changes in iOS */
  word-break: normal;
  -moz-tab-size: 4;
  tab-size: 4;
}

*,
::before,
::after {
  background-repeat: no-repeat; /* Set "background-repeat: no-repeat" to all elements and pseudo elements */
  box-sizing: inherit;
}

::before,
::after {
  text-decoration: inherit; /* Inherit text-decoration and vertical align to ::before and ::after pseudo elements */
  vertical-align: inherit;
}

* {
  padding: 0; /* Reset "padding" and "margin" of all elements */
  margin: 0;
}

/* # =================================================================
   # General elements
   # ================================================================= */

hr {
  overflow: visible; /* Show the overflow in Edge and IE */
  height: 0; /* Add the correct box sizing in Firefox */
  color: inherit; /* Correct border color in Firefox. */
}

details,
main {
  display: block; /* Render the "main" element consistently in IE. */
}

summary {
  display: list-item; /* Add the correct display in all browsers */
}

small {
  font-size: 80%; /* Set font-size to 80% in "small" elements */
}

[hidden] {
  display: none; /* Add the correct display in IE */
}

abbr[title] {
  border-bottom: none; /* Remove the bottom border in Chrome 57 */
  /* Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari */
  text-decoration: underline;
  text-decoration: underline dotted;
}

a {
  background-color: transparent; /* Remove the gray background on active links in IE 10 */
}

a:active,
a:hover {
  outline-width: 0; /* Remove the outline when hovering in all browsers */
}

code,
kbd,
pre,
samp {
  font-family: monospace, monospace; /* Specify the font family of code elements */
}

pre {
  font-size: 1em; /* Correct the odd "em" font sizing in all browsers */
}

b,
strong {
  font-weight: bolder; /* Add the correct font weight in Chrome, Edge, and Safari */
}

/* https://gist.github.com/unruthless/413930 */
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

table {
  border-color: inherit; /* Correct border color in all Chrome, Edge, and Safari. */
  text-indent: 0; /* Remove text indentation in Chrome, Edge, and Safari */
}

/* # =================================================================
   # Forms
   # ================================================================= */

input {
  border-radius: 0;
}

/* Replace pointer cursor in disabled elements */
[disabled] {
  cursor: default;
}

[type='number']::-webkit-inner-spin-button,
[type='number']::-webkit-outer-spin-button {
  height: auto; /* Correct the cursor style of increment and decrement buttons in Chrome */
}

[type='search'] {
  -webkit-appearance: textfield; /* Correct the odd appearance in Chrome and Safari */
  outline-offset: -2px; /* Correct the outline style in Safari */
}

[type='search']::-webkit-search-decoration {
  -webkit-appearance: none; /* Remove the inner padding in Chrome and Safari on macOS */
}

textarea {
  overflow: auto; /* Internet Explorer 11+ */
  resize: vertical; /* Specify textarea resizability */
}

button,
input,
optgroup,
select,
textarea {
  font: inherit; /* Specify font inheritance of form elements */
}

optgroup {
  font-weight: bold; /* Restore the font weight unset by the previous rule */
}

button {
  overflow: visible; /* Address "overflow" set to "hidden" in IE 8/9/10/11 */
}

button,
select {
  text-transform: none; /* Firefox 40+, Internet Explorer 11- */
}

/* Apply cursor pointer to button elements */
button,
[type='button'],
[type='reset'],
[type='submit'],
[role='button'] {
  cursor: pointer;
  color: inherit;
}

/* Remove inner padding and border in Firefox 4+ */
button::-moz-focus-inner,
[type='button']::-moz-focus-inner,
[type='reset']::-moz-focus-inner,
[type='submit']::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

/* Replace focus style removed in the border reset above */
button:-moz-focusring,
[type='button']::-moz-focus-inner,
[type='reset']::-moz-focus-inner,
[type='submit']::-moz-focus-inner {
  outline: 1px dotted ButtonText;
}

button,
html [type='button'], /* Prevent a WebKit bug where (2) destroys native "audio" and "video"controls in Android 4 */
[type='reset'],
[type='submit'] {
  -webkit-appearance: button; /* Correct the inability to style clickable types in iOS */
}

/* Remove the default button styling in all browsers */
button,
input,
select,
textarea {
  background-color: transparent;
  border-style: none;
}

a:focus,
button:focus,
input:focus,
select:focus,
textarea:focus {
  outline-width: 0;
}

/* Style select like a standard input */
select {
  -moz-appearance: none; /* Firefox 36+ */
  -webkit-appearance: none; /* Chrome 41+ */
}

select::-ms-expand {
  display: none; /* Internet Explorer 11+ */
}

select::-ms-value {
  color: currentColor; /* Internet Explorer 11+ */
}

legend {
  border: 0; /* Correct "color" not being inherited in IE 8/9/10/11 */
  color: inherit; /* Correct the color inheritance from "fieldset" elements in IE */
  display: table; /* Correct the text wrapping in Edge and IE */
  max-width: 100%; /* Correct the text wrapping in Edge and IE */
  white-space: normal; /* Correct the text wrapping in Edge and IE */
  max-width: 100%; /* Correct the text wrapping in Edge 18- and IE */
}

::-webkit-file-upload-button {
  /* Correct the inability to style clickable types in iOS and Safari */
  -webkit-appearance: button;
  color: inherit;
  font: inherit; /* Change font properties to "inherit" in Chrome and Safari */
}

/* # =================================================================
   # Specify media element style
   # ================================================================= */

img {
  border-style: none; /* Remove border when inside "a" element in IE 8/9/10 */
}

/* Add the correct vertical alignment in Chrome, Firefox, and Opera */
progress {
  vertical-align: baseline;
}

/* # =================================================================
   # Accessibility
   # ================================================================= */

/* Specify the progress cursor of updating elements */
[aria-busy='true'] {
  cursor: progress;
}

/* Specify the pointer cursor of trigger elements */
[aria-controls] {
  cursor: pointer;
}

/* Specify the unstyled cursor of disabled, not-editable, or otherwise inoperable elements */
[aria-disabled='true'] {
  cursor: default;
}

/********************** End of RESS 4.0.0 ***************************/

/********************** Reset range input style ***********************/

/* See https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/#applying-base-css-styles */
input[type=range] {
  /* Hides the slider so that custom slider can be made */
  -webkit-appearance: none;
  /* Remove white background in Chrome */
  background: transparent;
  /* "width: 100%;" (for Firefox which requires a specific width) is removed as it will override the custom-style (for unknown reason) */
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
}

input[type=range]:focus {
  /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
  outline: none;
}

input[type=range]::-ms-track {
  cursor: pointer;
  /* Hides the slider so custom styles can be added */
  background: transparent;
  border-color: transparent;
  color: transparent;
}

/******************* Custom global style ********************/

input {
  color: inherit; /* Prevent Chrome from applying "internal-light-dark" to override the body element's color property */
}

:root { /* The background-color on the body element won't spread over the entire page for some reason. */
  height: 100%;
}

body {
  height: 100%;  
}

#__next {
  height: 100%;
}

body[data-darkmode='false'] {
  background-color: ${map.cityblocks.day};
}
body[data-darkmode='true'] {
  background-color: ${map.cityblocks.night};
}
`;

export default GlobalStyle;
