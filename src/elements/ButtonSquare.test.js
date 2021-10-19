// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';

import {ButtonSquare} from './ButtonSquare';

describe('ButtonSquare component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(<ButtonSquare />);
    expect(container).toMatchInlineSnapshot(`
.c0 {
  background-color: rgba(255,255,255,0);
  border: none;
  height: 48px;
  width: 48px;
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
  top: 24px;
  right: 24px;
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

.c0[data-darkmode='false'] {
  --button-label-color-default: rgb(90,90,90);
  --button-label-color-focus: rgb(3,3,3);
}

.c0[data-darkmode='true'] {
  --button-label-color-default: rgb(218,218,218);
  --button-label-color-focus: rgb(255,255,255);
}

<div>
  <button
    class="c0"
  />
</div>
`);
  });
});
