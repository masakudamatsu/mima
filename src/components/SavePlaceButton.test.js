// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

import SavePlaceButton from './SavePlaceButton';

const accessibleName = 'Save a place';
const mockProps = {};

describe('SavePlaceButton component', () => {
  beforeEach(() => {
    render(<SavePlaceButton {...mockProps} />);
  });
  test(`has the accessible name of ${accessibleName}`, () => {
    expect(
      screen.getByRole('button', {name: accessibleName}),
    ).toBeInTheDocument();
  });
});

test('Accessibility checks', async () => {
  const {container} = render(<SavePlaceButton {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
