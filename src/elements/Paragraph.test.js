// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';

import {Paragraph} from './Paragraph';

const mockProps = {};

test('renders UI correctly', () => {
  const {container} = render(<Paragraph {...mockProps} />);
  expect(container).toMatchInlineSnapshot(`
.c0 {
  font-family: 'Noto Sans',Verdana,sans-serif;
  font-size: 1.0506rem;
  font-weight: 400;
  line-height: 1.25;
}

<div>
  <p
    class="c0"
  />
</div>
`);
});

// describe('Props change style correctly', () => {
//   test('testProp', () => {
//     render(<Paragraph testProp data-testid="Paragraph" />);
//     expect(screen.getByTestId('Paragraph')).toHaveStyle(
//       `display: block`,
//     );
//   });
// });
