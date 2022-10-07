import {buildReq, buildRes, getToken, getWord} from 'test/utils/generate';
import {mockValidate} from '@magic-sdk/admin';
import handleLogin from './login.api';

describe('happy path', () => {
  it('Handles a valid DID', async () => {
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

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });
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
