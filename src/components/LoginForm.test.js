// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

import {LoginForm} from './LoginForm';

const mockProps = {};

// describe(``, () => {
//   beforeEach(() => {
//     render(<LoginForm {...mockProps} />);
//   });
//   test(``, () => {
//   });
// });

test('Accessibility checks', async () => {
  const {container} = render(<LoginForm {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
