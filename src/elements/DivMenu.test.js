// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';

import {DivMenu} from './DivMenu';

const mockProps = {};

test('renders UI correctly', () => {
  const {container} = render(<DivMenu {...mockProps} />);
  expect(container).toMatchInlineSnapshot(`
.c0 {
  padding: 0.875rem;
}

<div>
  <div
    class="c0"
  />
</div>
`);
});

// describe('Props change style correctly', () => {
//   test('testProp', () => {
//     render(<DivMenu testProp data-testid="DivMenu" />);
//     expect(screen.getByTestId('DivMenu')).toHaveStyle(
//       `display: block`,
//     );
//   });
// });
