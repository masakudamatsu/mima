// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {axe} from 'jest-axe';

import {MenuButton} from './MenuButton';
import {NightModeContext} from 'src/context/NightModeContext';
import {buttonLabel, menuLabel} from 'src/utils/uiCopies';

const accessibleName = buttonLabel.menu;
const mockProps = {
  stopTracking: jest.fn().mockName('stopTracking'),
  trackUserLocation: jest.fn().mockName('trackUserLocation'),
  watchID: null,
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
    render(<MenuButton {...mockProps} />, {wrapper: Wrapper.lightMode});
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

describe('Menu window', () => {
  beforeEach(() => {
    render(<MenuButton {...mockProps} />, {wrapper: Wrapper.lightMode});
  });
  test('is hidden by default', () => {
    expect(screen.getByRole('heading', {hidden: true})).not.toBeVisible();
  });
  test('is shown by clicking menu button', () => {
    userEvent.click(screen.getByRole('button', {name: buttonLabel.menu}));
    expect(screen.getByRole('heading')).toHaveTextContent(menuLabel);
  });
  test('focuses close button after being opened', () => {
    userEvent.click(screen.getByRole('button', {name: buttonLabel.menu}));
    expect(screen.getByRole('button', {name: buttonLabel.close})).toHaveFocus();
  });
  test('is hidden again by clicking close button on menu window', () => {
    userEvent.click(screen.getByRole('button', {name: buttonLabel.menu}));
    userEvent.click(screen.getByRole('button', {name: buttonLabel.close}));
    expect(screen.getByRole('heading', {hidden: true})).not.toBeVisible();
  });
  test('is hidden again by clicking Esc button', () => {
    userEvent.click(screen.getByRole('button', {name: buttonLabel.menu}));
    userEvent.type(
      screen.getByRole('button', {name: buttonLabel.close}),
      '{esc}',
    );
    expect(screen.getByRole('heading', {hidden: true})).not.toBeVisible();
  });
});

describe('Menu window content', () => {
  beforeEach(() => {
    render(<MenuButton {...mockProps} />, {wrapper: Wrapper.lightMode});
    userEvent.click(screen.getByRole('button', {name: buttonLabel.menu}));
  });
  it('includes search', () => {
    expect(screen.getByRole('button', {name: /search place/i})).toBeVisible();
  });
  it('includes flight takeoff icon menu, the clicking of which calls trackUserLocation() and closes the menu window', () => {
    userEvent.click(screen.getByRole('button', {name: /find where you are/i}));
    expect(mockProps.trackUserLocation).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('heading', {hidden: true})).not.toBeVisible();
  });
  it('includes save', () => {
    expect(screen.getByRole('button', {name: /save place/i})).toBeVisible();
  });
  it('DOES NOT include flight landing icon menu', () => {
    expect(
      screen.queryByRole('button', {name: /stop showing where you are/i}),
    ).not.toBeInTheDocument();
  });
});

describe('watchID prop', () => {
  const watchID = 2;
  beforeEach(() => {
    render(<MenuButton {...mockProps} watchID={watchID} />, {
      wrapper: Wrapper.lightMode,
    });
    userEvent.click(screen.getByRole('button', {name: buttonLabel.menu}));
  });
  it('allows the user to stop tracking their location', () => {
    userEvent.click(
      screen.getByRole('button', {name: /stop showing where you are/i}),
    );
    expect(mockProps.stopTracking).toHaveBeenCalledTimes(1);
    expect(mockProps.stopTracking).toHaveBeenCalledWith(watchID);
  });
});

test('Accessibility checks', async () => {
  const {container} = render(<MenuButton {...mockProps} />, {
    wrapper: Wrapper.lightMode,
  });
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
