// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';

import {Button} from './Button';

describe('Button component', () => {
  test('renders the daytime UI correctly', () => {
    const {container} = render(<Button.Daytime />);
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
  bottom: var(--button-bottom,auto);
  left: var(--button-left,auto);
  right: var(--button-right,auto);
  top: var(--button-top,auto);
}

.c0[data-position='top-left'] {
  --button-top: 12px;
  --button-left: 14px;
}

.c0[data-position='top-right'] {
  --button-top: 12px;
  --button-right: 14px;
}

.c0[data-position='bottom-right'] {
  --button-bottom: 24px;
  --button-right: 14px;
}

.c0[data-position='bottom-right-second'] {
  --button-bottom: 84px;
  --button-right: 14px;
}

.c0 svg {
  fill: rgb(90,90,90);
}

.c0:focus svg,
.c0:hover svg {
  fill: rgb(3,3,3);
}

.c0:active svg {
  fill: rgb(90,90,90);
}

.c0 #cloud {
  fill: rgba(255,255,255,0.93);
}

.c0 #cloud {
  stroke: rgb(148,148,148);
}

.c0 svg {
  -webkit-filter: drop-shadow( 0px 0px 1px rgba(3,3,3,0.33) ) drop-shadow( 0px 0px 2px rgba(3,3,3,0.33) ) drop-shadow( 0px 0px 4px rgba(3,3,3,0.33) );
  filter: drop-shadow( 0px 0px 1px rgba(3,3,3,0.33) ) drop-shadow( 0px 0px 2px rgba(3,3,3,0.33) ) drop-shadow( 0px 0px 4px rgba(3,3,3,0.33) );
}

.c0:focus #cloud,
.c0:hover #cloud {
  stroke: rgb(69,159,189);
}

.c0:focus svg,
.c0:hover svg {
  -webkit-filter: drop-shadow( 0px 0px 5px rgb(69,159,189) );
  filter: drop-shadow( 0px 0px 5px rgb(69,159,189) );
}

.c0:active svg {
  -webkit-filter: none;
  filter: none;
}

.c0:active #cloud {
  stroke: none;
}

<div>
  <button
    class="c0"
  />
</div>
`);
  });

  test('renders the nighttime UI correctly', () => {
    const {container} = render(<Button.Nighttime />);
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
  bottom: var(--bottom,auto);
  left: var(--left,auto);
  right: var(--right,auto);
  top: var(--top,auto);
}

.c0[data-position='top-left'] {
  --top: 12px;
  --left: 14px;
}

.c0[data-position='top-right'] {
  --top: 12px;
  --right: 14px;
}

.c0[data-position='bottom-right'] {
  --bottom: 24px;
  --right: 14px;
}

.c0[data-position='bottom-right-second'] {
  --bottom: 84px;
  --right: 14px;
}

.c0 svg {
  fill: rgb(218,218,218);
}

.c0:focus svg,
.c0:hover svg {
  fill: rgb(255,255,255);
}

.c0:active svg {
  fill: rgb(218,218,218);
}

.c0 #cloud {
  fill: rgba(123,123,123,0.8);
}

.c0 #cloud {
  stroke: #2b2b2b;
}

.c0 svg {
  -webkit-filter: drop-shadow( 0px 0px 1px rgba(3,3,3,0.6) ) drop-shadow( 0px 0px 2px rgba(3,3,3,0.6) ) drop-shadow( 0px 0px 4px rgba(3,3,3,0.6) );
  filter: drop-shadow( 0px 0px 1px rgba(3,3,3,0.6) ) drop-shadow( 0px 0px 2px rgba(3,3,3,0.6) ) drop-shadow( 0px 0px 4px rgba(3,3,3,0.6) );
}

.c0:focus #cloud,
.c0:hover #cloud {
  stroke: rgba(255,255,255,0.4);
}

.c0:focus svg,
.c0:hover svg {
  -webkit-filter: drop-shadow( 0px 0px 10px rgb(255,255,255) );
  filter: drop-shadow( 0px 0px 10px rgb(255,255,255) );
}

.c0:active svg {
  -webkit-filter: none;
  filter: none;
}

.c0:active #cloud {
  stroke: none;
}

<div>
  <button
    class="c0"
  />
</div>
`);
  });
});
