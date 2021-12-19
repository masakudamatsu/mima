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
  // disable warning in console; see https://github.com/nickcolley/jest-axe/issues/147#issuecomment-758804533
  const {getComputedStyle} = window;
  window.getComputedStyle = elt => getComputedStyle(elt);

  const {container} = render(<SearchBox {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
