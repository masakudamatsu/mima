// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

import SearchButton from './SearchButton';

const accessibleName = 'Search a place';
const mockProps = {};

describe('SearchButton component', () => {
  beforeEach(() => {
    render(<SearchButton {...mockProps} />);
  });
  test(`has the accessible name of ${accessibleName}`, () => {
    expect(
      screen.getByRole('button', {name: accessibleName}),
    ).toBeInTheDocument();
  });
});

test('Accessibility checks', async () => {
  const {container} = render(<SearchButton {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
