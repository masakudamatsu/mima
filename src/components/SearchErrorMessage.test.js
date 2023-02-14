// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

import {SearchErrorMessage} from './SearchErrorMessage';

const mockProps = {};

// describe(``, () => {
//   beforeEach(() => {
//     render(<SearchErrorMessage {...mockProps} />);
//   });
//   test(``, () => {
//   });
// });

test('Accessibility checks', async () => {
  const {container} = render(<SearchErrorMessage {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
