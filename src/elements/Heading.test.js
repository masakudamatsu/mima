// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';

import {Heading} from './Heading';

const mockProps = {};

test('renders UI correctly', () => {
  const {container} = render(<Heading {...mockProps} />);
  expect(container).toMatchInlineSnapshot(`
.c0 {
  font-family: 'Noto Sans Display',Georgia,sans-serif;
  font-weight: 700;
}

<div>
  <h1
    class="c0"
  />
</div>
`);
});

// describe('Props change style correctly', () => {
//   test('testProp', () => {
//     render(<Heading testProp data-testid="Heading" />);
//     expect(screen.getByTestId('Heading')).toHaveStyle(
//       `display: block`,
//     );
//   });
// });
