import {buildReq, buildRes, getToken} from 'test/utils/generate';
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
