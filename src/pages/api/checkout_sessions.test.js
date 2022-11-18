// mocking
import {buildReq, buildRes, getWord} from 'test/utils/generate';

// mock stripe
// see https://www.notion.so/Testing-patterns-Stripe-de67f7caf9584991b9b578e8dbf246b5#bce94a8d3d124f6190ccf470262d672e

// function to test
import handleCheckoutSessions from './checkout_sessions.api';

// mock Auth0
jest.mock('@auth0/nextjs-auth0', () => {
  const originalModule = jest.requireActual('@auth0/nextjs-auth0');

  return {
    ...originalModule,
    getAccessToken: () => 'access_token',
    withApiAuthRequired: handler => handler,
    withPageAuthRequired: page => () => page(),
  };
});

describe('happy path', () => {
  beforeEach(() => {});
  // TODO #307: Mock Stripe module
  it.skip('works', async () => {
    const req = buildReq();
    const res = buildRes();
    await handleCheckoutSessions(req, res);
  });
});

describe('sad path', () => {
  // Mock console.error, to supress error messages in the console;
  // For tests expected to call console.error, we check if it's called only for the expected # of times;
  // If this assertion fails, there must be an error in the code.
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    console.error.mockRestore();
  });
  it('handles a wrong request method', async () => {
    const req = buildReq({
      method: getWord().toUpperCase(),
    });
    const res = buildRes();

    await handleCheckoutSessions(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.setHeader).toHaveBeenCalledTimes(1);
    expect(res.setHeader).toHaveBeenCalledWith('Allow', 'POST');

    expect(console.error).toHaveBeenCalledTimes(0);
  });
});
