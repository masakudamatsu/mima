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
  -webkit-animation: jBcSpD 210ms cubic-bezier(0.0,0.0,0.2,1) 90ms;
  animation: jBcSpD 210ms cubic-bezier(0.0,0.0,0.2,1) 90ms;
  -webkit-animation-fill-mode: backwards;
  animation-fill-mode: backwards;
  -webkit-transform-origin: top right;
  -ms-transform-origin: top right;
  transform-origin: top right;
  -webkit-transition: opacity 90ms cubic-bezier(0.4,0.0,1,1), -webkit-transform 300ms cubic-bezier(0.4,0.0,0.2,1);
  -webkit-transition: opacity 90ms cubic-bezier(0.4,0.0,1,1), transform 300ms cubic-bezier(0.4,0.0,0.2,1);
  transition: opacity 90ms cubic-bezier(0.4,0.0,1,1), transform 300ms cubic-bezier(0.4,0.0,0.2,1);
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

.c0:focus svg,
.c0:hover svg {
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

.c0:focus #cloud,
.c0:hover #cloud {
  stroke: var(--button-outline-color-focus);
}

.c0:focus:not(:focus-visible) #cloud {
  stroke: var(--button-outline-color);
}

.c0:focus svg,
.c0:hover svg {
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

.c0[data-transition='out'] {
  opacity: 0;
  -webkit-transform: scale(10);
  -ms-transform: scale(10);
  transform: scale(10);
}

.c0[data-loading='true'] {
  -webkit-animation: bPkxfw 1500ms linear infinite;
  animation: bPkxfw 1500ms linear infinite;
}

<div>
  <button
    class="c0"
  />
</div>
`);
  });
});
