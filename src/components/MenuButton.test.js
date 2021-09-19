// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

import MenuButton from './MenuButton';

const accessibleName = 'Show menu';
const mockProps = {};

describe('MenuButton component', () => {
  beforeEach(() => {
    render(<MenuButton {...mockProps} />);
  });
  test(`has the accessible name of ${accessibleName}`, () => {
    expect(
      screen.getByRole('button', {name: accessibleName}),
    ).toBeInTheDocument();
  });
});

test('Accessibility checks', async () => {
  const {container} = render(<MenuButton {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
