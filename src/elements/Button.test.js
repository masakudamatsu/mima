// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';

import Button from './Button';

test(`sets the type attribute to be "button"`, () => {
  render(<Button data-testid="button" />);
  expect(screen.getByTestId('button')).toHaveAttribute('type', 'button');
});

test('renders the default UI correctly', () => {
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
  stroke: rgb(148,148,148);
}

.c0 svg {
  -webkit-filter: drop-shadow(0px 0px 5px rgba(0,0,0,0.42));
  filter: drop-shadow(0px 0px 5px rgba(0,0,0,0.42));
}

.c0:focus #cloud,
.c0:hover #cloud {
  stroke: none;
}

.c0:focus svg,
.c0:hover svg {
  -webkit-filter: drop-shadow(0px 0px 5px rgb(18 89 229));
  filter: drop-shadow(0px 0px 5px rgb(18 89 229));
}

.c0:active svg {
  -webkit-filter: none;
  filter: none;
}

<div>
  <button
    class="c0"
    type="button"
  />
</div>
`);
});

test(`located at top-left with the $topLeft prop`, () => {
  render(<Button $topLeft data-testid="button" />);
  expect(screen.getByTestId('button')).toHaveStyle(`
    top: 12px;
    left: 14px;
  `);
});

test(`located at top-right with the $topRight prop`, () => {
  render(<Button $topRight data-testid="button" />);
  expect(screen.getByTestId('button')).toHaveStyle(`
    top: 12px;
    right: 14px;
  `);
});

test(`located at bottom-right with the $bottomRight prop`, () => {
  render(<Button $bottomRight data-testid="button" />);
  expect(screen.getByTestId('button')).toHaveStyle(`
    bottom: 24px;
    right: 14px;
  `);
});

test(`located at second-bottom-right with the $bottomRightSecond prop`, () => {
  render(<Button $bottomRightSecond data-testid="button" />);
  expect(screen.getByTestId('button')).toHaveStyle(`
    bottom: 84px;
    right: 14px;
  `);
});
