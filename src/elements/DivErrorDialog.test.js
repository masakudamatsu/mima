// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';

import {DivErrorDialog} from './DivErrorDialog';

const mockProps = {};

test('renders UI correctly', () => {
  const {container} = render(<DivErrorDialog {...mockProps} />);
  expect(container).toMatchInlineSnapshot(`
.c0 p + p {
  margin-top: 0.4965rem;
}

.c0 h1 + p {
  margin-top: -0.2836rem;
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
//     render(<DivErrorDialog testProp data-testid="DivErrorDialog" />);
//     expect(screen.getByTestId('DivErrorDialog')).toHaveStyle(
//       `display: block`,
//     );
//   });
// });
