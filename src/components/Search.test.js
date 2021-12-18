// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

import {Search} from './Search';

const mockProps = {};

describe('HTML checks', () => {
  beforeEach(() => {
    render(<Search {...mockProps} />);
  });
  test(`assigns the "search" landmark role`, () => {
    expect(screen.getByRole('search')).toBeVisible();
  });
});

test('Accessibility checks', async () => {
  const {container} = render(<Search {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
