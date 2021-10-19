// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';

import DivScrim from './DivScrim';

const mockProps = {};

test('renders UI correctly', () => {
  const {container} = render(<DivScrim {...mockProps} />);
  expect(container).toMatchInlineSnapshot(`
.c0 {
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 2;
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
//     render(<DivScrim testProp data-testid="DivScrim" />);
//     expect(screen.getByTestId('DivScrim')).toHaveStyle(
//       `display: block`,
//     );
//   });
// });
