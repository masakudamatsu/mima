// eslint-disable-next-line no-unused-vars
import {render as rtlRender, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {axe} from 'jest-axe';

import {Search} from './Search';
import {buttonLabel} from 'src/utils/uiCopies';
import {duration} from 'src/utils/designtokens';

import {PlaceIdProvider} from 'src/wrappers/PlaceIdContext';
import {mockPlacesApi} from 'src/utils/mockFunfctions';

function Wrapper({children}) {
  return <PlaceIdProvider>{children}</PlaceIdProvider>;
}
function render(ui, options) {
  return rtlRender(ui, {wrapper: Wrapper, ...options});
}

beforeEach(() => {
  mockPlacesApi();
});

const mockProps = {};

describe('HTML checks', () => {
  beforeEach(() => {
    render(<Search {...mockProps} />);
  });
  test(`assigns the "search" landmark role`, () => {
    expect(screen.getByRole('search')).toBeVisible();
  });
});

describe('Once the search button is pressed...', () => {
  beforeEach(async () => {
    render(<Search {...mockProps} />);
    await waitFor(() => {
      userEvent.click(screen.getByRole('button', {name: buttonLabel.search}));
    });
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  test(`sets 'data-searchbox' attribute to be true`, async () => {
    expect(screen.getByRole('search')).toHaveAttribute(
      'data-searchbox',
      'true',
    );
  });
  test(`assigns aria-expanded="true" to the close button`, () => {
    expect(
      screen.getByRole('button', {name: buttonLabel.closeSearchbox}),
    ).toHaveAttribute('aria-expanded', 'true');
  });
  test(`sets 'data-searchbox' attribute to be closing after close button is clicked`, () => {
    userEvent.click(
      screen.getByRole('button', {name: buttonLabel.closeSearchbox}),
    );
    expect(screen.getByRole('search')).toHaveAttribute(
      'data-searchbox',
      'closing',
    );
  });
  test(`gets dismounted ${duration.modal.exit}ms after clicking close button`, async () => {
    userEvent.click(
      screen.getByRole('button', {name: buttonLabel.closeSearchbox}),
    );
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
