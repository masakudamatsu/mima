// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';

import {ButtonDialog} from './ButtonDialog';

describe('ButtonDialog component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(<ButtonDialog />);
    expect(container).toMatchInlineSnapshot(`
.c0 {
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  min-height: 48px;
  min-width: 96px;
  border-color: var(--dialog-button-color);
  color: var(--dialog-button-color);
}

.c0:focus {
  outline: 2px solid var(--dialog-button-color);
  outline-offset: 2px;
}

.c0:focus:not(:focus-visible) {
  outline: none;
  outline-offset: initial;
}

.c0[data-reset-link-style="true"] {
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
  -webkit-text-decoration: none;
  text-decoration: none;
}

.c0[data-reset-link-style="true"]:not([href]) {
  cursor: not-allowed;
  opacity: 0.3;
}

<div>
  <button
    class="c0"
  />
</div>
`);
  });
});
