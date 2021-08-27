import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

import LocatorButton from './LocatorButton';

const accessibleName = 'Show current location';
const mockProps = {
  getCurrentPosition: jest.fn().mockName('getCurrentPosition'),
};

describe('LocatorButton component', () => {
  beforeEach(() => {
    render(<LocatorButton {...mockProps} />);
  });
  test(`has the accessible name of Show current lcoation`, () => {
    expect(
      screen.getByRole('button', {name: accessibleName}),
    ).toBeInTheDocument();
  });
  test('sets the button label SVG image size explicitly', () => {
    // Otherwise Safari fails to render the magnifying glass SVG icon
    expect(screen.getByRole('img', {name: accessibleName})).toHaveAttribute(
      'width',
    );
    expect(screen.getByRole('img', {name: accessibleName})).toHaveAttribute(
      'height',
    );
  });
  test('calls getCurrentPosition() when clicked', () => {
    screen.getByRole('button', {name: accessibleName}).click();
    expect(mockProps.getCurrentPosition).toHaveBeenCalledTimes(1);
  });
});

test('Accessibility checks', async () => {
  const {container} = render(<LocatorButton {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
