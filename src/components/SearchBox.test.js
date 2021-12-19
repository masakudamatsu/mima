// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

import {SearchBox} from './SearchBox';

const mockProps = {};

// describe(``, () => {
//   beforeEach(() => {
//     render(<SearchBox {...mockProps} />);
//   });
//   test(``, () => {
//   });
// });

test('Accessibility checks', async () => {
  const {container} = render(<SearchBox {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
