// eslint-disable-next-line no-unused-vars
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {axe} from 'jest-axe';

import {mockLoginWithMagicLink} from 'magic-sdk';
import {useRouter} from 'next/router';

import {getToken} from 'test/utils/generate';
import {LoginForm} from './LoginForm';
import {loginPage} from 'src/utils/uiCopies';

const mockProps = {};
const mockEmail = 'username@example.com';
const mockDID = getToken();

// mock fetch()
global.fetch = jest.fn(() => Promise.resolve({ok: true})).mockName('fetch');

// mock useRouter()
// https://github.com/vercel/next.js/issues/7479#issuecomment-626297880
jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn().mockName('useRouter'),
}));

let mockRouter;
describe(`LoginForm: happy path`, () => {
  beforeEach(() => {
    // mock the receipt of DID
    mockLoginWithMagicLink.mockResolvedValueOnce(mockDID);
    // mock router.push()
    // https://github.com/vercel/next.js/issues/7479#issuecomment-626297880
    mockRouter = {
      push: jest.fn().mockName('router.push'),
    };
    useRouter.mockReturnValue(mockRouter);
    render(<LoginForm {...mockProps} />);
  });
  test(`Shows an example email address`, () => {
    expect(screen.getByLabelText(loginPage.fieldLabel)).toHaveAttribute(
      'placeholder',
      loginPage.fieldPlaceholder,
    );
  });
  test(`Shows "Email Sent" message after submitting an email address`, async () => {
    userEvent.type(screen.getByLabelText(loginPage.fieldLabel), mockEmail);
    userEvent.click(screen.getByRole('button', {name: loginPage.buttonLabel}));
    expect(
      await screen.findByRole('dialog', {
        name: loginPage.emailSentMessage.title(mockEmail),
      }),
    ).toBeVisible();
    const disableDefaultUI = {
      showUI: false,
    };
    expect(mockLoginWithMagicLink.mock.calls[0][0]).toMatchObject(
      disableDefaultUI,
    );
  });
  test(`Sends Magic Link to the user after submitting an email address`, () => {
    // execute
    userEvent.type(screen.getByLabelText(loginPage.fieldLabel), mockEmail);
    userEvent.click(screen.getByRole('button', {name: loginPage.buttonLabel}));
    // verify
    expect(mockLoginWithMagicLink).toHaveBeenCalledTimes(1);
    expect(mockLoginWithMagicLink.mock.calls[0][0]).toMatchObject({
      email: mockEmail,
    });
  });
  test(`Sends a request with DID to login route after the user clicks Magic Link`, async () => {
    // execute
    userEvent.type(screen.getByLabelText(loginPage.fieldLabel), mockEmail);
    userEvent.click(screen.getByRole('button', {name: loginPage.buttonLabel}));
    // verify
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
    expect(fetch).toHaveBeenCalledWith('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${mockDID}`,
      },
    });
  });
  test('Redirect to the app if login is successful', async () => {
    // execute
    userEvent.type(screen.getByLabelText(loginPage.fieldLabel), mockEmail);
    userEvent.click(screen.getByRole('button', {name: loginPage.buttonLabel}));
    // verify
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledTimes(1);
    });
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });
});

describe('LoginForm: sad path', () => {
  beforeEach(() => {
    render(<LoginForm {...mockProps} />);
  });
  it('handles the lack of an email address upon submission', () => {
    // TODO #259: Customize error handling
    expect(screen.getByLabelText(loginPage.fieldLabel)).toHaveAttribute(
      'required',
    );
  });
  it('handles invalid email addresses', () => {
    // TODO #259: Customize error handling
    expect(screen.getByLabelText(loginPage.fieldLabel)).toHaveAttribute(
      'type',
      'email',
    );
  });
  test(`Shows the login form again after clicking the try again button in the "Email Sent" message`, async () => {
    const emailField = screen.getByLabelText(loginPage.fieldLabel);
    const submitButton = screen.getByRole('button', {
      name: loginPage.buttonLabel,
    });
    userEvent.type(emailField, mockEmail);
    userEvent.click(submitButton);
    expect(emailField).not.toBeInTheDocument();
    expect(submitButton).not.toBeInTheDocument();
    userEvent.click(
      screen.getByRole('button', {name: loginPage.tryAgainButtonLabel}),
    );
    expect(screen.getByLabelText(loginPage.fieldLabel)).toBeVisible();
    expect(
      screen.getByRole('button', {
        name: loginPage.buttonLabel,
      }),
    ).toBeVisible();
  });
  test('Shows login failure message with Try Again button when authentication fails', async () => {
    // setup
    fetch.mockImplementationOnce(() => Promise.resolve({ok: false}));
    // execute
    userEvent.type(screen.getByLabelText(loginPage.fieldLabel), mockEmail);
    userEvent.click(screen.getByRole('button', {name: loginPage.buttonLabel}));
    // verify
    await waitFor(() => {
      expect(
        screen.getByRole('alertdialog', {
          name: loginPage.loginFailureMessage.title,
        }),
      ).toBeVisible();
    });
    userEvent.click(
      screen.getByRole('button', {name: loginPage.tryAgainButtonLabel}),
    );
    expect(screen.getByLabelText(loginPage.fieldLabel)).toBeVisible();
    expect(
      screen.getByRole('button', {
        name: loginPage.buttonLabel,
      }),
    ).toBeVisible();
  });
});

test('Accessibility checks', async () => {
  const {container} = render(<LoginForm {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
