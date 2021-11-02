// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';

import {DivErrorDialog} from './DivErrorDialog';

const mockProps = {};

test('renders UI correctly', () => {
  const {container} = render(<DivErrorDialog {...mockProps} />);
  expect(container).toMatchInlineSnapshot(`
.c0 {
  font-family: 'Noto Sans',Verdana,sans-serif;
  font-size: 1.0506rem;
  font-weight: 400;
  line-height: 1.25;
}

.c0 h1 + p {
  margin-top: -0.2836rem;
}

.c0 p + p {
  margin-top: 0.4965rem;
}

.c0 p + button {
  margin-top: 1.1112rem;
}

.c0 button {
  color: var(--button-color);
}

.c0[data-darkmode='false'] {
  --button-color: #4285F4;
}

.c0[data-darkmode='true'] {
  --button-color: #1bb6ff;
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
