import {render} from '@testing-library/react';

import {DivMenuBackground} from './DivMenuBackground';

describe('DivMenuBackground component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(
      <DivMenuBackground.Wrapper>
        <DivMenuBackground />
      </DivMenuBackground.Wrapper>,
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
  top: 0;
  padding: calc(2 * var(--popup-margin)) 10px 10px 10px;
  --popup-margin: 8px;
  color: var(--popup-text-color);
  font-family: 'Noto Sans',Verdana,sans-serif;
  font-size: 1.0506rem;
  font-weight: 400;
  line-height: 1.25;
  -webkit-animation-duration: 300ms;
  animation-duration: 300ms;
  -webkit-animation-fill-mode: backwards;
  animation-fill-mode: backwards;
  -webkit-animation-name: iYejkx,hePhrH;
  animation-name: iYejkx,hePhrH;
  -webkit-animation-timing-function: cubic-bezier(0.0,0.0,0.2,1);
  animation-timing-function: cubic-bezier(0.0,0.0,0.2,1);
  -webkit-transform-origin: top left;
  -ms-transform-origin: top left;
  transform-origin: top left;
}

.c1 img[data-logo] {
  max-width: 290px;
  width: calc(100% - var(--popup-margin) * 2 - 48px);
}

.c1 button[aria-label="Close"] {
  position: absolute;
  right: var(--popup-margin);
  top: var(--popup-margin);
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
  top: 0;
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

@media (min-width:1095px) {
  .c1 {
    right: calc(var(--blur-radius) * 2);
  }
}

@media screen and (min-width:540px) {
  .c1 {
    padding: 48px 48px 48px 48px;
  }
}

@media screen and (min-width:540px) {
  .c1 img[data-logo] {
    width: auto;
  }
}

@media (prefers-reduced-motion:reduce) {
  .c1 {
    -webkit-animation-name: lbWRkT;
    animation-name: lbWRkT;
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

@media (min-width:1095px) {
  .c0 {
    right: 67%;
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
