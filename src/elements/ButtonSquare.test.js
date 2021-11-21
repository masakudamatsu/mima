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
  right: 0;
  top: 0;
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

<div>
  <button
    class="c0"
  />
</div>
`);
  });
});
