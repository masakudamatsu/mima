// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';

import {H2PlaceName} from './H2PlaceName';

const mockProps = {};

test('renders UI correctly', () => {
  const {container} = render(<H2PlaceName {...mockProps} />);
  expect(container).toMatchInlineSnapshot(`
.c0 {
  font-family: 'Noto Sans Display',Georgia,sans-serif;
  font-size: 1.3986rem;
  font-weight: 700;
  line-height: 1.092;
  padding-bottom: 0.8252rem;
  padding-top: 0.7385rem;
}

<div>
  <h2
    class="c0"
  />
</div>
`);
});

// describe('Props change style correctly', () => {
//   test('testProp', () => {
//     render(<H2PlaceName testProp data-testid="H2PlaceName" />);
//     expect(screen.getByTestId('H2PlaceName')).toHaveStyle(
//       `display: block`,
//     );
//   });
// });
