---
to: src/components/<%= name %>.test.js
---
// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

import {<%= name %>} from './<%= name %>';

const mockProps = {};

// describe(``, () => {
//   beforeEach(() => {
//     render(<<%= name %> {...mockProps} />);
//   });
//   test(``, () => {
//   });
// });

test('Accessibility checks', async () => {
  const {container} = render(<<%= name %> {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});


