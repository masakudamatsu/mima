import {render} from '@testing-library/react';
import {axe} from 'jest-axe';

import {Noscript} from './Noscript';

test('renders UI correctly', () => {
  const {container} = render(<Noscript />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <noscript />
    </div>
  `);
});

test('is accessible', async () => {
  const {container} = render(<Noscript />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
