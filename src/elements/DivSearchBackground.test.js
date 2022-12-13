import {render} from '@testing-library/react';

import {DivSearchBackground} from './DivSearchBackground';

describe('DivSearchBackground component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(<DivSearchBackground />);
    expect(container).toMatchInlineSnapshot(`
.c0 {
  position: absolute;
  z-index: 2;
  --blur-radius: 8px;
  background-color: var(--popup-background-color-fallback);
  height: 100%;
  width: 100%;
  --popup-margin: 8px;
  -webkit-animation-duration: 300ms;
  animation-duration: 300ms;
  -webkit-animation-fill-mode: backwards;
  animation-fill-mode: backwards;
  -webkit-animation-name: jBcSpD;
  animation-name: jBcSpD;
  -webkit-animation-timing-fiunction: linear;
  animation-timing-fiunction: linear;
}

.c0 button[aria-label="Close search box"] {
  position: absolute;
  right: var(--popup-margin);
  top: var(--popup-margin);
  z-index: 4;
}

.c0 div[id="searchbox"],
.c0 ul[aria-label="Autocomplete suggestions"] {
  margin: 0 auto;
  width: calc(100% - var(--popup-margin) * 2);
  z-index: 3;
}

.c0 div[id="searchbox"] {
  margin-top: calc(48px + var(--popup-margin) * 2);
}

.c0 ul[aria-label="Autocomplete suggestions"] {
  margin-top: 8px;
}

.c0[data-closing='true'] {
  -webkit-animation-duration: 250ms;
  animation-duration: 250ms;
  -webkit-animation-name: jiroXv;
  animation-name: jiroXv;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}

@supports (-webkit-backdrop-filter:blur(var(--blur-radius))) or (backdrop-filter:blur(var(--blur-radius))) {
  .c0 {
    background-color: var(--popup-background-color);
    -webkit-backdrop-filter: blur(var(--blur-radius));
    backdrop-filter: blur(var(--blur-radius));
  }
}

@supports (background-image:-moz-element(#map)) and (not (backdrop-filter:blur(var(--blur-radius)))) {
  .c0 {
    background-color: transparent;
  }

  .c0::before {
    background-attachment: fixed;
    background-image: -moz-element(#map);
    content: "";
    -webkit-filter: blur(var(--blur-radius));
    filter: blur(var(--blur-radius));
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -2;
  }

  .c0::after {
    background-color: var(--popup-background-color);
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
  }
}

<div>
  <div
    class="c0"
  />
</div>
`);
  });
});
