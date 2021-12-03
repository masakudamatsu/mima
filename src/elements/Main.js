import styled from 'styled-components';

const drawMapFullscreen = `
  height: 100%;
`;

const createStackingContext = `
  isolation: isolate;
`; // Without stacking context, full-screen scrim won't be able to disable the clicking of Google Logo (z-index: 1000000) and buttons at the bottom-right corners (z-index: 1000001)

export const Main = styled.main.attrs({
  id: 'map', // for Firefox's -moz-element() function
})`
  ${drawMapFullscreen}
  ${createStackingContext}
`;
