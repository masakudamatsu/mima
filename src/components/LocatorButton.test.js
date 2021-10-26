// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {axe} from 'jest-axe';

import {LocatorButton} from './LocatorButton';
import {NightModeContext} from 'src/context/NightModeContext';
import {buttonLabel} from 'src/utils/uiCopies';

const accessibleName = buttonLabel.locator.default;
const mockProps = {
  mapObject: {},
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
  beforeEach(() => {
    // Mock Geolocation API; otherwise it's "undefined"
    // source: https://stackoverflow.com/a/43957674
    const mockGeolocation = {
      getCurrentPosition: jest.fn(),
      watchPosition: jest.fn(),
    };
    global.navigator.geolocation = mockGeolocation;
  });
  test('toggles data-loading attribute value', () => {
    render(<LocatorButton {...mockProps} />, {wrapper: Wrapper.lightMode});
    const button = screen.getByRole('button', {name: accessibleName});
    expect(button).toHaveAttribute('data-loading', 'false');
    userEvent.click(button);
    expect(button).toHaveAttribute('data-loading', 'true');
  });
});

test('Accessibility checks', async () => {
  const {container} = render(<LocatorButton {...mockProps} />, {
    wrapper: Wrapper.lightMode,
  });
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
