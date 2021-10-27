// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';

import {DivDialog} from './DivDialog';

const mockProps = {};

test('renders UI correctly', () => {
  const {container} = render(<DivDialog {...mockProps} />);
  expect(container).toMatchInlineSnapshot(`
.c0[aria-hidden='true'] {
  display: none;
}

.c0[aria-hidden='false'] {
  display: block;
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
//     render(<DivDialog testProp data-testid="DivDialog" />);
//     expect(screen.getByTestId('DivDialog')).toHaveStyle(
//       `display: block`,
//     );
//   });
// });
