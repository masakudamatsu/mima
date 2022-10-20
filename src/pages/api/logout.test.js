// mocking
import {buildReq, buildRes, getToken, getWord} from 'test/utils/generate';
import {mockLogoutByIssuer} from '@magic-sdk/admin';

// function to test
import handleLogout from './logout.api';

// test helper
import Iron from '@hapi/iron';

// mocking and test helper
import iron, {encryptSession} from 'src/utils/iron';
// track the calls of decryptToken
const decryptToken = jest.spyOn(iron, 'decryptToken');

// test helpers
const mockUserId = getToken();

describe('happy path', () => {
  beforeEach(() => {
    mockLogoutByIssuer.mockResolvedValue(null);
  });
  it('Decrypts session token', async () => {
    const req = buildReq({
      method: 'POST',
      cookies: {
        api_token: await encryptSession({userId: mockUserId}),
      },
    });
    const res = buildRes();

    await handleLogout(req, res);

    expect(decryptToken).toHaveBeenCalledTimes(1);
    expect(decryptToken).toHaveBeenCalledWith(req.cookies['api_token']);
  });
  it('Calls logoutByIssuer to log the user out from Magic', async () => {
    const req = buildReq({
      method: 'POST',
      cookies: {
        api_token: await encryptSession({userId: mockUserId}),
      },
    });
    const res = buildRes();

    await handleLogout(req, res);

    expect(mockLogoutByIssuer).toHaveBeenCalledTimes(1);
    expect(mockLogoutByIssuer).toHaveBeenCalledWith(mockUserId);
  });
  it('Sends an expired empty cookie to remove a session token', async () => {
    const req = buildReq({
      method: 'POST',
      cookies: {
        api_token: await encryptSession({userId: mockUserId}),
      },
    });
    const res = buildRes();

    await handleLogout(req, res);

    expect(res.setHeader).toHaveBeenCalledTimes(1);
    expect(res.setHeader.mock.calls[0]).toMatchInlineSnapshot(`
Array [
  "Set-Cookie",
  "api_token=; Max-Age=-1; Path=/",
]
`);
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

    await handleLogout(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(405);
  });
  it('handles the absence of any cookie in the request', async () => {
    const req = buildReq({
      method: 'POST',
      cookies: undefined,
    });
    const res = buildRes();

    await handleLogout(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
Array [
  Object {
    "message": "User is not logged in.",
  },
]
`);
    expect(console.error).toHaveBeenCalledTimes(1);
  });
  it('handles the absence of api_token in the request', async () => {
    const req = buildReq({
      method: 'POST',
      cookies: {
        api_token: undefined,
      },
    });
    const res = buildRes();

    await handleLogout(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
Array [
  Object {
    "message": "User is not logged in.",
  },
]
`);
    expect(console.error).toHaveBeenCalledTimes(1);
  });
  it('handles a session token encrypted with a wrong secret', async () => {
    const wrongSecret =
      '112bd40c41c4ad291a8a8e1820de1703d4c1c3f2f4c2ed9e460a9586e5f8f0f6';
    const req = buildReq({
      method: 'POST',
      cookies: {
        api_token: await Iron.seal({mockUserId}, wrongSecret, Iron.defaults),
      },
    });
    const res = buildRes();

    await handleLogout(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
Array [
  Object {
    "message": "User is not logged in.",
  },
]
`);
    expect(console.error).toHaveBeenCalledTimes(1);
  });
  it('handles the absence of user ID in the session token', async () => {
    const req = buildReq({
      method: 'POST',
      cookies: {
        api_token: await encryptSession({userId: null}),
      },
    });
    const res = buildRes();

    await handleLogout(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
Array [
  Object {
    "message": "User is not logged in.",
  },
]
`);
    expect(console.error).toHaveBeenCalledTimes(1);
  });
});
