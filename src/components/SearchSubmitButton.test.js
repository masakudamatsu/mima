// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

import {SearchSubmitButton} from './SearchSubmitButton';

const mockProps = {};

// describe(``, () => {
//   beforeEach(() => {
//     render(<SearchSubmitButton {...mockProps} />);
//   });
//   test(``, () => {
//   });
// });

test('Accessibility checks', async () => {
  const {container} = render(<SearchSubmitButton {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
