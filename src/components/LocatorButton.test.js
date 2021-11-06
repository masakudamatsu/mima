// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {axe} from 'jest-axe';

import {LocatorButton} from './LocatorButton';
import {NightModeContext} from 'src/context/NightModeContext';
import {buttonLabel} from 'src/utils/uiCopies';

const accessibleName = buttonLabel.locator.default;
const mockProps = {
  initializeUI: jest.fn().mockName('initializeUI'),
  moveToCurrentLocation: jest.fn().mockName('moveToCurrentLocation'),
  status: 'initial',
  trackUserLocation: jest.fn().mockName('trackUserLocation'),
};
const Wrapper = {
  lightMode: ({children}) => (
    <NightModeContext.Provider value={false}>
      {children}
    </NightModeContext.Provider>
  ),
  darkMode: ({children}) => (
    <NightModeContext.Provider value={true}>
      {children}
    </NightModeContext.Provider>
  ),
};

describe('HTML checks', () => {
  beforeEach(() => {
    render(<LocatorButton {...mockProps} />, {wrapper: Wrapper.lightMode});
  });
  test(`has the accessible name of ${accessibleName}`, () => {
    expect(
      screen.getByRole('button', {name: accessibleName}),
    ).toBeInTheDocument();
  });
  test(`sets the type attribute to be "button"`, () => {
    expect(screen.getByRole('button', {name: accessibleName})).toHaveAttribute(
      'type',
      'button',
    );
  });
});

describe('Clicking the button', () => {
  test('calls trackUserLocation()', () => {
    render(<LocatorButton {...mockProps} />, {wrapper: Wrapper.lightMode});
    userEvent.click(screen.getByRole('button', {name: accessibleName}));
    expect(mockProps.trackUserLocation).toHaveBeenCalledTimes(1);
  });
});

describe(`changes the button label with 'status' prop`, () => {
  test('if loading, data-loading attribute turns true', () => {
    render(<LocatorButton {...mockProps} status="loading" />, {
      wrapper: Wrapper.lightMode,
    });
    const button = screen.getByRole('button', {name: accessibleName});
    expect(button).toHaveAttribute('data-loading', 'true');
  });
  test('if watching, the button accessible name changes', () => {
    render(<LocatorButton {...mockProps} status="watching" />, {
      wrapper: Wrapper.lightMode,
    });
    expect(
      screen.getByRole('button', {name: buttonLabel.locator.activated}),
    ).toBeVisible();
  });
  test('if watching, clicking the button calls moveToCurrentLocation()', () => {
    render(<LocatorButton {...mockProps} status="watching" />, {
      wrapper: Wrapper.lightMode,
    });
    userEvent.click(
      screen.getByRole('button', {name: buttonLabel.locator.activated}),
    );
    expect(mockProps.moveToCurrentLocation).toHaveBeenCalledTimes(1);
  });
});

test('Accessibility checks', async () => {
  const {container} = render(<LocatorButton {...mockProps} />, {
    wrapper: Wrapper.lightMode,
  });
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
