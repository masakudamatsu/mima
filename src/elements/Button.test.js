// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';

import {Button} from './Button';

describe('Button component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(<Button />);
    expect(container).toMatchInlineSnapshot(`
.c0 {
  background-color: rgba(255,255,255,0);
  border: none;
  height: 48px;
  width: 56px;
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
  position: absolute;
  z-index: 1;
  -webkit-animation-duration: 300ms;
  animation-duration: 300ms;
  -webkit-animation-fill-mode: backwards;
  animation-fill-mode: backwards;
  -webkit-animation-name: lbWRkT;
  animation-name: lbWRkT;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-tap-highlight-color: transparent;
}

.c0:focus {
  outline-style: none;
}

.c0[data-position='top-left'] {
  top: 12px;
  left: 14px;
}

.c0[data-position='top-right'] {
  top: 12px;
  right: 14px;
}

.c0[data-position='bottom-right'] {
  bottom: 24px;
  right: 14px;
}

.c0[data-position='bottom-right-second'] {
  bottom: 84px;
  right: 14px;
}

.c0 svg {
  fill: var(--button-label-color-default);
}

.c0:focus svg {
  fill: var(--button-label-color-focus);
}

.c0:focus:not(:focus-visible) svg {
  fill: var(--button-label-color-default);
}

.c0:active svg {
  fill: var(--button-label-color-default);
}

.c0 #cloud {
  fill: var(--button-color);
}

.c0 #cloud {
  stroke: var(--button-outline-color);
}

.c0 svg {
  -webkit-filter: drop-shadow( 0px 0px 1px var(--button-shadow-color) ) drop-shadow( 0px 0px 2px var(--button-shadow-color) ) drop-shadow( 0px 0px 4px var(--button-shadow-color) );
  filter: drop-shadow( 0px 0px 1px var(--button-shadow-color) ) drop-shadow( 0px 0px 2px var(--button-shadow-color) ) drop-shadow( 0px 0px 4px var(--button-shadow-color) );
}

.c0:focus #cloud {
  stroke: var(--button-outline-color-focus);
}

.c0:focus:not(:focus-visible) #cloud {
  stroke: var(--button-outline-color);
}

.c0:focus svg {
  -webkit-filter: drop-shadow( 0px 0px var(--button-shadow-blur-radius-focus) var(--button-shadow-color-focus) );
  filter: drop-shadow( 0px 0px var(--button-shadow-blur-radius-focus) var(--button-shadow-color-focus) );
}

.c0:focus:not(:focus-visible) svg {
  -webkit-filter: drop-shadow( 0px 0px 1px var(--button-shadow-color) ) drop-shadow( 0px 0px 2px var(--button-shadow-color) ) drop-shadow( 0px 0px 4px var(--button-shadow-color) );
  filter: drop-shadow( 0px 0px 1px var(--button-shadow-color) ) drop-shadow( 0px 0px 2px var(--button-shadow-color) ) drop-shadow( 0px 0px 4px var(--button-shadow-color) );
}

.c0:active svg {
  -webkit-filter: none;
  filter: none;
}

.c0:active #cloud {
  stroke: none;
}

.c0[data-closing='true'] {
  -webkit-transform-origin: top right;
  -ms-transform-origin: top right;
  transform-origin: top right;
  -webkit-animation-duration: 300ms;
  animation-duration: 300ms;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-name: dnyzVB,iVskkp;
  animation-name: dnyzVB,iVskkp;
  -webkit-animation-timing-function: cubic-bezier(0.0,0.0,0.2,1);
  animation-timing-function: cubic-bezier(0.0,0.0,0.2,1);
}

.c0[data-closing='true'][data-position='top-left'] {
  -webkit-transform-origin: top left;
  -ms-transform-origin: top left;
  transform-origin: top left;
}

.c0[data-loading='true'] {
  -webkit-animation: bPkxfw 1500ms linear infinite;
  animation: bPkxfw 1500ms linear infinite;
}

@media (prefers-reduced-motion:reduce) {
  .c0 {
    -webkit-animation-duration: 250ms;
    animation-duration: 250ms;
  }
}

@media (prefers-reduced-motion:reduce) {
  .c0[data-closing='true'] {
    -webkit-animation-name: gHmQJP;
    animation-name: gHmQJP;
  }
}

<div>
  <button
    class="c0"
  />
</div>
`);
  });
});
