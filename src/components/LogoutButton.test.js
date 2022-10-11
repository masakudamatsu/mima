// eslint-disable-next-line no-unused-vars
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {axe} from 'jest-axe';

import {LogoutButton} from './LogoutButton';

import {useRouter} from 'next/router';
import {buttonLabel} from 'src/utils/uiCopies';

const mockProps = {
  closeMenu: jest.fn().mockName('closeMenu'),
};

// mock fetch()
global.fetch = jest.fn(() => Promise.resolve({ok: true})).mockName('fetch');

// mock useRouter()
// https://github.com/vercel/next.js/issues/7479#issuecomment-626297880
jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn().mockName('useRouter'),
}));

let mockRouter;

describe(`LogoutButton`, () => {
  beforeEach(() => {
    // mock router.push()
    // https://github.com/vercel/next.js/issues/7479#issuecomment-626297880
    mockRouter = {
      push: jest.fn().mockName('router.push'),
    };
    useRouter.mockReturnValue(mockRouter);

    render(<LogoutButton {...mockProps} />);
  });
  test(`closes the menu by calling closeMenu()`, () => {
    userEvent.click(screen.getByRole('button', {name: buttonLabel.logout}));
    expect(mockProps.closeMenu).toHaveBeenCalledTimes(1);
  });
  test(`makes an API call to '/api/logout' after clicking the logout button`, async () => {
    userEvent.click(screen.getByRole('button', {name: buttonLabel.logout}));
    // verify
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
    expect(fetch).toHaveBeenCalledWith('/api/logout', {
      method: 'POST',
    });
  });
  test(`calls router.push() to redirect to the login page if logout succeeds`, async () => {
    userEvent.click(screen.getByRole('button', {name: buttonLabel.logout}));
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledTimes(1);
    });
    expect(mockRouter.push).toHaveBeenCalledWith('/login');
  });
});

test('Accessibility checks', async () => {
  const {container} = render(<LogoutButton {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
