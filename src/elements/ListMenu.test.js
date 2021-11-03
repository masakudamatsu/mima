// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';

import {ListMenu} from './ListMenu';

const mockProps = {};

test('renders UI correctly', () => {
  const {container} = render(<ListMenu {...mockProps} />);
  expect(container).toMatchInlineSnapshot(`
.c0 {
  list-style: none;
}

.c0 li {
  padding: 4px 0;
}

.c0 li button {
  height: 48px;
}

.c0 li:not(:first-of-type) {
  border-top: 1px solid var(--button-color);
}

.c0[data-darkmode='false'] {
  --button-color: #4285F4;
}

.c0[data-darkmode='true'] {
  --button-color: #1bb6ff;
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
