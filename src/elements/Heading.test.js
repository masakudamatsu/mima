// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';

import {Heading} from './Heading';

const mockProps = {};

test('renders UI correctly', () => {
  const {container} = render(<Heading {...mockProps} />);
  expect(container).toMatchInlineSnapshot(`
.c0 {
  font-family: 'Noto Sans Display',Georgia,sans-serif;
  font-size: 1.8623rem;
  font-weight: 700;
  line-height: 1.092;
  padding-bottom: 1.0988rem;
  padding-top: 0.9833rem;
}

.c0[data-editor],
.c0[data-address-editor],
.c0[data-url-editor] {
  font-size: 1.0504rem;
  line-height: 1.092;
  padding-bottom: 0.6197rem;
  padding-top: 0.5546rem;
}

.c0[data-address-editor] {
  border-top: 1px solid var(--button-outline-color);
  margin-top: 10px;
}

@media screen and (min-width:540px) {
  .c0[data-editor] {
    font-size: 1.8623rem;
    line-height: 1.092;
    padding-bottom: 1.0988rem;
    padding-top: 0.9833rem;
  }
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
