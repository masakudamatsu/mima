// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';

import {ListMenu} from './ListMenu';

const mockProps = {};

test('renders UI correctly', () => {
  const {container} = render(<ListMenu {...mockProps} />);
  expect(container).toMatchInlineSnapshot(`
.c0 {
  list-style: none;
  border-bottom: 1px solid var(--menu-border-color);
  border-top: 1px solid var(--menu-border-color);
  color: var(--menu-item-color);
  font-weight: 700;
}

.c0 li:not(:first-of-type) {
  border-top: 1px solid var(--menu-border-color);
}

.c0 li {
  padding: 4px 0;
}

.c0 li a,
.c0 li button {
  height: 48px;
}

.c0 a,
.c0 button {
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

.c0 svg {
  margin-right: 0.4375rem;
}

.c0 svg {
  fill: var(--menu-item-color);
}

.c0 button[disabled] {
  opacity: 0.2;
  pointer-events: none;
}

.c0 a {
  color: var(--menu-item-color);
  -webkit-text-decoration: none;
  text-decoration: none;
}

<div>
  <ul
    class="c0"
    role="list"
  />
</div>
`);
});

test('adds ARIA-role of list', () => {
  // see https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html
  render(<ListMenu {...mockProps} />);
  expect(screen.getByRole('list')).toHaveAttribute('role', 'list');
});

// describe('Props change style correctly', () => {
//   test('testProp', () => {
//     render(<ListMenu testProp data-testid="ListMenu" />);
//     expect(screen.getByTestId('ListMenu')).toHaveStyle(
//       `display: block`,
//     );
//   });
// });
