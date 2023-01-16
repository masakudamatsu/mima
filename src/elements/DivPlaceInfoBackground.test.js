import {render} from '@testing-library/react';

import {DivPlaceInfoBackground} from './DivPlaceInfoBackground';

describe('DivPlaceInfoBackground component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(
      <DivPlaceInfoBackground.Wrapper>
        <DivPlaceInfoBackground />
      </DivPlaceInfoBackground.Wrapper>,
    );
    expect(container).toMatchInlineSnapshot(`
.c1 {
  --blur-radius: 8px;
  background-color: var(--popup-background-color-fallback);
  box-shadow: 0px 0px var(--blur-radius) var(--blur-radius) var(--popup-glow-color-fallback);
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: calc(var(--blur-radius) * 2);
  --popup-margin: 8px;
  color: var(--popup-text-color);
  font-family: 'Noto Sans',Verdana,sans-serif;
  font-size: 1.0506rem;
  font-weight: 400;
  line-height: 1.25;
  -webkit-animation-duration: 250ms;
  animation-duration: 250ms;
  -webkit-animation-fill-mode: backwards;
  animation-fill-mode: backwards;
  -webkit-animation-name: lbWRkT;
  animation-name: lbWRkT;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
}

.c1 button[aria-label="Close place detail"] {
  position: absolute;
  right: var(--popup-margin);
  top: var(--popup-margin);
}

.c1 h2,
.c1 p,
.c1 button:not([aria-label="Close place detail"]) {
  margin-left: var(--popup-margin);
}

.c1 h2,
.c1 p {
  --close-button-width: calc(48px + 8px * 2);
  max-width: 561px;
  width: calc(100% - var(--close-button-width));
}

.c1 h2 {
  padding-bottom: 0.8252rem;
  padding-top: 0.7385rem;
}

.c1 p:first-of-type {
  margin-top: -0.2836rem;
}

.c1 p + p {
  margin-top: 0.4965rem;
}

.c1 div + button,
.c1 p + button {
  margin-top: 0.7801rem;
}

.c1 a {
  color: var(--link-text-color);
}

.c1 h2 {
  font-family: 'Noto Sans Display',Georgia,sans-serif;
  font-size: 1.3986rem;
  font-weight: 700;
  line-height: 1.092;
}

.c1[data-closing='true'] {
  -webkit-animation-duration: 300ms;
  animation-duration: 300ms;
  -webkit-animation-name: gHmQJP;
  animation-name: gHmQJP;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
}

.c0 {
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
  right: 0;
  top: 50%;
  overflow: hidden;
}

.c0[data-closing='true'] {
  color: black;
  mix-blend-mode: lighten;
}

.c0[data-closing='true'] [id="ripple"] {
  background-color: currentColor;
}

@supports (-webkit-backdrop-filter:blur(var(--blur-radius))) or (backdrop-filter:blur(var(--blur-radius))) {
  .c1 {
    background-color: var(--popup-background-color);
    -webkit-backdrop-filter: blur(var(--blur-radius));
    backdrop-filter: blur(var(--blur-radius));
  }
}

@supports (background-image:-moz-element(#map)) and (not (backdrop-filter:blur(var(--blur-radius)))) {
  .c1 {
    background-color: transparent;
  }

  .c1::before {
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

  .c1::after {
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

@supports (-webkit-backdrop-filter:blur(var(--blur-radius))) or (backdrop-filter:blur(var(--blur-radius))) {
  .c1 {
    box-shadow: 0px 0px var(--blur-radius) var(--blur-radius) var(--popup-glow-color);
  }
}

@supports (background-image:-moz-element(#map)) and (not (backdrop-filter:blur(var(--blur-radius)))) {
  .c1 {
    box-shadow: none;
  }

  .c1::after {
    box-shadow: 0px 0px var(--blur-radius) var(--blur-radius) var(--popup-glow-color);
  }
}

@media (prefers-reduced-motion:reduce) {
  .c1[data-closing='true'] {
    -webkit-animation-duration: 250ms;
    animation-duration: 250ms;
    -webkit-animation-name: gHmQJP;
    animation-name: gHmQJP;
  }
}

<div>
  <div
    class="c0"
  >
    <div
      class="c1"
    />
  </div>
</div>
`);
  });
});
