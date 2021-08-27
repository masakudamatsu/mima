// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';

import Button from './Button';

test('sets the type attribute to be button', () => {
  render(<Button data-testid="button" />);
  expect(screen.getByTestId('button')).toHaveAttribute('type', 'button');
});

test('starts flashing when loading prop turns true', () => {
  render(<Button $loading data-testid="button" />);
  expect(screen.getByTestId('button')).toHaveStyle(
    `animation: bPkxfw 2s linear infinite;`,
  );
});

test('renders UI correctly', () => {
  const {container} = render(<Button />);
  expect(container).toMatchInlineSnapshot(`
.c0 {
  border: none;
  background-color: #fff;
  color: #9aa0a6;
  fill: currentColor;
  height: 44px;
  width: 44px;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  position: absolute;
  right: 8px;
  bottom: 16px;
  z-index: 1;
}

.c0:focus,
.c0:hover {
  color: rgba(0,0,0,0.87);
}

.c0:active {
  color: #9aa0a6;
}

<div>
  <button
    class="c0"
    type="button"
  />
</div>
`);
});
