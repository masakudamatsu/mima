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
  padding-bottom: 8px;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 0;
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

.c1[data-fullscreen="true"] {
  top: 0;
}

.c1 button[aria-label="Close place detail"] {
  position: absolute;
  right: 8px;
  top: 8px;
}

.c1 button+button {
  margin-left: 8px;
}

.c1 > div,
.c1 > form {
  margin: 0 auto;
  max-width: 561px;
}

.c1 h2,
.c1 p {
  --close-button-width: calc(48px + 8px * 2);
  width: calc(100% - var(--close-button-width));
}

.c1[role="alertdialog"] {
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.c1[role="alertdialog"] div {
  -webkit-align-items: flex-start;
  -webkit-box-align: flex-start;
  -ms-flex-align: flex-start;
  align-items: flex-start;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.c1[role="alertdialog"] p {
  width: 100%;
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

.c1 .ProseMirror h2.is-empty::before,
.c1 .ProseMirror p.is-empty:first-of-type::before {
  color: var(--placeholder-text-color);
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

.c1 .ProseMirror:focus-visible {
  outline-style: none;
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

.c0[data-fullscreen="true"] {
  top: 0;
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

@media screen and (min-width:540px) {
  .c1 {
    padding-bottom: 48px;
    padding-left: 48px;
    padding-right: 48px;
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
