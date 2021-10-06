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

.c0:focus svg,
.c0:hover svg {
  -webkit-filter: drop-shadow( 0px 0px var(--button-shadow-blur-radius-focus) var(--button-shadow-color-focus) );
  filter: drop-shadow( 0px 0px var(--button-shadow-blur-radius-focus) var(--button-shadow-color-focus) );
}

.c0:active svg {
  -webkit-filter: none;
  filter: none;
}

.c0:active #cloud {
  stroke: none;
}

.c0[data-darkmode='false'] {
  --button-label-color-default: rgb(90,90,90);
  --button-label-color-focus: rgb(3,3,3);
  --button-color: rgba(255,255,255,0.93);
  --button-outline-color: rgb(148,148,148);
  --button-outline-color-focus: rgb(69,159,189);
  --button-shadow-blur-radius-focus: 5px;
  --button-shadow-color: rgba(3,3,3,0.33);
  --button-shadow-color-focus: rgb(69,159,189);
}

.c0[data-darkmode='true'] {
  --button-label-color-default: rgb(218,218,218);
  --button-label-color-focus: rgb(255,255,255);
  --button-color: rgba(123,123,123,0.8);
  --button-outline-color: #2b2b2b;
  --button-outline-color-focus: rgba(255,255,255,0.4);
  --button-shadow-blur-radius-focus: 10px;
  --button-shadow-color: rgba(3,3,3,0.6);
  --button-shadow-color-focus: rgb(255,255,255);
}

<div>
  <button
    class="c0"
  />
</div>
`);
  });
});
