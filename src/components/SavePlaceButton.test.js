// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

import {SavePlaceButton} from './SavePlaceButton';
import {NightModeContext} from 'src/context/NightModeContext';
import {buttonLabel} from 'src/utils/uiCopies';

const accessibleName = buttonLabel.save;
const mockProps = {};
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
    render(<SavePlaceButton {...mockProps} />, {wrapper: Wrapper.lightMode});
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

test('Accessibility checks', async () => {
  const {container} = render(<SavePlaceButton {...mockProps} />, {
    wrapper: Wrapper.lightMode,
  });
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
