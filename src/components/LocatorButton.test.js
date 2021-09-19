// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

import LocatorButton from './LocatorButton';

const accessibleName = 'Show current location';
const mockProps = {};

describe('LocatorButton component', () => {
  beforeEach(() => {
    render(<LocatorButton {...mockProps} />);
  });
  test(`has the accessible name of ${accessibleName}`, () => {
    expect(
      screen.getByRole('button', {name: accessibleName}),
    ).toBeInTheDocument();
  });
});

test('Accessibility checks', async () => {
  const {container} = render(<LocatorButton {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
