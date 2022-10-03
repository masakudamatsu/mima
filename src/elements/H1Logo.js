import styled from 'styled-components';

import {dimension} from 'src/utils/designtokens';

const setTypeface = `
  font-family: 'Josefin Slab', serif;
  font-weight: 500;
`;

const linearlyScaleTextSize = `
  --min-viewport-width: 320;
  --current-viewport-width: clamp(320px, 100vw, ${dimension.searchBox['max-width']});
  --min-font-size: 36;
  font-size: calc(var(--min-font-size) * var(--current-viewport-width) / var(--min-viewport-width));
`; // borrowed from https://css-tricks.com/how-to-get-a-pixel-perfect-linearly-scaled-ui/#aa-scaling-our-ui

const removeSpaceBetweenLetters = `
  word-spacing: -0.25em;
`;

export const H1Logo = styled.h1`
  ${setTypeface}
  ${linearlyScaleTextSize}
  ${removeSpaceBetweenLetters}
`;
