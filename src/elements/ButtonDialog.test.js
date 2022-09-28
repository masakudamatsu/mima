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
  outline: 2px solid rgb(69,159,189);
  outline-offset: 2px;
}

.c0:focus:not(:focus-visible) {
  outline: none;
  outline-offset: initial;
}

<div>
  <button
    class="c0"
  />
</div>
`);
  });
});
