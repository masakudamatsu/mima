// eslint-disable-next-line no-unused-vars
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {axe} from 'jest-axe';

import {Search} from './Search';
import {buttonLabel} from 'src/utils/uiCopies';
import {duration} from 'src/utils/designtokens';

const mockProps = {};

describe('HTML checks', () => {
  beforeEach(() => {
    render(<Search {...mockProps} />);
  });
  test(`assigns the "search" landmark role`, () => {
    expect(screen.getByRole('search')).toBeVisible();
  });
});

describe('Background div', () => {
  beforeEach(() => {
    render(<Search {...mockProps} />);
    userEvent.click(screen.getByRole('button', {name: buttonLabel.search}));
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  test(`sets 'data-transition-out' attribute to be false by default`, () => {
    expect(screen.getByTestId('cloud-background')).toHaveAttribute(
      'data-transition-out',
      'false',
    );
  });
  test(`sets 'data-transition-out' attribute to be true after close button is clicked`, () => {
    userEvent.click(screen.getByRole('button', {name: buttonLabel.close}));
    expect(screen.getByTestId('cloud-background')).toHaveAttribute(
      'data-transition-out',
      'true',
    );
  });
  test(`gets dismounted ${duration.modal.exit}ms after clicking close button`, async () => {
    userEvent.click(screen.getByRole('button', {name: buttonLabel.close}));
    await waitFor(() => {
      jest.advanceTimersByTime(duration.modal.exit);
    });
    expect(screen.queryByTestId('cloud-background')).not.toBeInTheDocument();
  });
});

describe.skip('Loading message', () => {
  beforeEach(() => {
    render(<Search {...mockProps} />);
  });
  test('appears after clicking search button', () => {
    userEvent.click(screen.getByRole('button', {name: buttonLabel.search}));
    expect(screen.getByText(/loading/i)).toBeVisible();
  });
});

test('Accessibility checks', async () => {
  const {container} = render(<Search {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
