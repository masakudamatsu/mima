// mocking
import {
  buildReq as buildReqOriginal,
  buildRes as buildResOriginal,
  getEmail,
  getToken,
  getWord,
} from 'test/utils/generate';
import {mockGetMetadataByToken, mockValidate} from '@magic-sdk/admin';
import {prismaMock} from 'test/utils/prismaMock';

// function to test
import handleLogin from './login.api';

// test helpers
import {parse} from 'cookie';
import {decryptToken} from 'src/utils/iron';

const buildReq = (did, override = {}) => {
  return buildReqOriginal({
    method: 'POST',
    headers: {
      authorization: `Bearer ${did}`,
    },
    ...override,
  });
};

const buildRes = (override = {}) => {
  return buildResOriginal({
    setHeader: jest.fn().mockName('res.setHeader'),
  });
};

const userEmail = getEmail();
const userId = getToken();

describe('happy path', () => {
  beforeEach(() => {
    // default mock implementations
    mockValidate.mockResolvedValue(null);
    mockGetMetadataByToken.mockResolvedValue({
      issuer: userId,
      email: userEmail,
    });
    prismaMock.user.findUnique.mockResolvedValue(null); // it's a new user
    prismaMock.user.create.mockResolvedValue({
      userId: userId,
      email: userEmail,
    });
  });
  it('Validates the DID sent by client', async () => {
    const did = getToken();
    const req = buildReq(did);
    const res = buildRes();

    await handleLogin(req, res);

    expect(mockValidate).toHaveBeenCalledTimes(1);
    expect(mockValidate).toHaveBeenCalledWith(did);
    expect(res.status).toHaveBeenCalledTimes(0);
  });
  it('Retrieves unique user ID from Magic server', async () => {
    const did = getToken();
    const req = buildReq(did);
    const res = buildRes();
    await handleLogin(req, res);

    expect(mockGetMetadataByToken).toHaveBeenCalledTimes(1);
    expect(mockGetMetadataByToken).toHaveBeenCalledWith(did);

    expect(res.status).toHaveBeenCalledTimes(0);
  });
  it('Adds a new user to the database', async () => {
    const did = getToken();
    const req = buildReq(did);
    const res = buildRes();

    await handleLogin(req, res);

    expect(prismaMock.user.create).toHaveBeenCalledTimes(1);
    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: {
        userId: userId,
        email: userEmail,
      },
    });
  });
  it('Does not add a user if s/he has already signed up', async () => {
    const did = getToken();
    const req = buildReq(did);
    const res = buildRes();

    // user has signed up before
    prismaMock.user.findUnique.mockResolvedValueOnce({
      email: userEmail,
      userId: userId,
    });

    await handleLogin(req, res);

    expect(prismaMock.user.create).toHaveBeenCalledTimes(0);
  });
  it('Sends a valid session token to the client', async () => {
    const did = getToken();
    const req = buildReq(did);
    const res = buildRes({setHeader: jest.fn()});

    await handleLogin(req, res);

    // verify a cookie was set
    expect(res.setHeader).toHaveBeenCalledTimes(1);
    expect(res.setHeader.mock.calls[0][0]).toBe('Set-Cookie');

    // check if user ID can be retrieved from the session token sent as a cookie
    const cookie = res.setHeader.mock.calls[0][1];
    const sessionToken = parse(cookie).api_token; // API reference: https://github.com/jshttp/cookie#cookieparsestr-options
    const {userId} = await decryptToken(sessionToken);
    expect(userId).toBe(userId);
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
    const did = getToken();
    const req = buildReq(did, {
      method: getWord().toUpperCase(),
    });
    const res = buildRes();

    await handleLogin(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(405);

    expect(console.error).toHaveBeenCalledTimes(0);
  });
  it('handles an invalid DID', async () => {
    const invalidDid = getToken();
    const req = buildReq(invalidDid);
    const res = buildRes();

    mockValidate.mockRejectedValueOnce(new Error());

    await handleLogin(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(401);

    expect(console.error).toHaveBeenCalledTimes(0);
  });
  it('handles Magic database error', async () => {
    const did = getToken();
    const req = buildReq(did);
    const res = buildRes();

    mockGetMetadataByToken.mockRejectedValueOnce(new Error());

    await handleLogin(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500); // https://stackoverflow.com/a/36252591

    expect(console.error).toHaveBeenCalledTimes(1);
  });
  it('handles an error during the existing user check', async () => {
    const did = getToken();
    const req = buildReq(did);
    const res = buildRes();

    prismaMock.user.findUnique.mockRejectedValueOnce(new Error());

    await handleLogin(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);

    expect(console.error).toHaveBeenCalledTimes(1);
  });
  it('handles an error during the new user addition', async () => {
    const did = getToken();
    const req = buildReq(did);
    const res = buildRes();

    prismaMock.user.create.mockRejectedValue(new Error());

    await handleLogin(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);

    expect(console.error).toHaveBeenCalledTimes(1);
  });
});
