import {render} from '@testing-library/react';

import {ComposeDialog} from './ComposeDialog';

describe('ComposeDialog component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(<ComposeDialog />);
    expect(container).toMatchInlineSnapshot(`
.c0 {
  --height: 34%;
  color: var(--popup-text-color);
  font-family: 'Noto Sans',Verdana,sans-serif;
  font-size: 1.0506rem;
  font-weight: 400;
  line-height: 1.25;
  height: var(--height);
  width: 100%;
  --blur-radius: 8px;
  background-color: var(--popup-background-color-fallback);
  box-shadow: 0px 0px var(--blur-radius) var(--blur-radius) var(--popup-glow-color-fallback);
  position: absolute;
  left: 0;
  top: calc(100% - var(--height));
  z-index: 3;
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

.c0 a {
  color: var(--link-text-color);
}

.c0 h2 {
  font-family: 'Noto Sans Display',Georgia,sans-serif;
  font-size: 1.3986rem;
  font-weight: 700;
  line-height: 1.092;
}

.c0 button[aria-label="Close place detail"] {
  position: absolute;
  right: var(--popup-margin);
  top: var(--popup-margin);
  z-index: 4;
}

.c0 h2,
.c0 p,
.c0 button:not([aria-label="Close place detail"]) {
  margin-left: var(--popup-margin);
}

.c0 h2,
.c0 p {
  --close-button-width: calc(48px + 8px * 2);
  max-width: 561px;
  width: calc(100% - var(--close-button-width));
}

.c0 h2 {
  padding-bottom: 0.8252rem;
  padding-top: 0.7385rem;
}

.c0 p:first-of-type {
  margin-top: -0.2836rem;
}

.c0 p + p {
  margin-top: 0.4965rem;
}

.c0 div + button {
  margin-top: 0.7801rem;
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
    box-shadow: 0px 0px var(--blur-radius) var(--blur-radius) var(--popup-glow-color);
  }
}

@supports (background-image:-moz-element(#map)) and (not (backdrop-filter:blur(var(--blur-radius)))) {
  .c0 {
    background-color: transparent;
    box-shadow: none;
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
    box-shadow: 0px 0px var(--blur-radius) var(--blur-radius) var(--popup-glow-color);
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
    role="dialog"
  />
</div>
`);
  });
});
