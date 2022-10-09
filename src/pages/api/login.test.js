import {buildReq, buildRes, getToken, getWord} from 'test/utils/generate';
import {mockGetMetadataByToken, mockValidate} from '@magic-sdk/admin';
import handleLogin from './login.api';

describe('happy path', () => {
  it('Validates the DID sent by client', async () => {
    const did = getToken();
    const req = buildReq({
      method: 'POST',
      headers: {
        authorization: `Bearer ${did}`,
      },
    });
    const res = buildRes();

    await handleLogin(req, res);

    expect(mockValidate).toHaveBeenCalledTimes(1);
    expect(mockValidate).toHaveBeenCalledWith(did);
  });
  it('Retrieves unique user ID from Magic server', async () => {
    const did = getToken();
    const req = buildReq({
      method: 'POST',
      headers: {
        authorization: `Bearer ${did}`,
      },
    });
    const res = buildRes();

    await handleLogin(req, res);

    expect(mockGetMetadataByToken).toHaveBeenCalledTimes(1);
    expect(mockGetMetadataByToken).toHaveBeenCalledWith(did);
  });
  // TODO #268: fix mockGetMetadataByToken's throwing error so the following three tests can be run
  it.skip('Adds a new user to the database', async () => {});
  it.skip('Encrypts user ID', async () => {});
  it.skip('Creates a cookie from encrypted user ID', async () => {});
  it.skip('Sends cookie to the client', async () => {});
});

describe('sad path', () => {
  it('handles an invalid DID', async () => {
    mockValidate.mockRejectedValueOnce(new Error());
    const did = getToken();
    const req = buildReq({
      method: 'POST',
      headers: {
        authorization: `Bearer ${did}`,
      },
    });
    const res = buildRes();

    await handleLogin(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(401);
  });
  it('handles a wrong request method', async () => {
    const req = buildReq({
      method: getWord().toUpperCase(),
    });
    const res = buildRes();

    await handleLogin(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(405);
  });
});
