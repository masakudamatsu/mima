import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {axe} from 'jest-axe';

import MapLocator from './MapLocator';

const accessibleName = 'Show current location';

const mockProps = {
  mapObject: {
    setCenter: jest.fn().mockName('setCenter'),
  },
};

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
};

const originalGeolocation = global.navigator.geolocation;

describe('MapLocator component', () => {
  beforeEach(() => {
    global.navigator.geolocation = mockGeolocation;
    render(<MapLocator {...mockProps} />);
  });
  afterEach(() => {
    global.navigator.geolocation = originalGeolocation;
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
    userEvent.click(screen.getByRole('button', {name: accessibleName}));
    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
  });
});

test('Accessibility checks', async () => {
  const {container} = render(<MapLocator {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
