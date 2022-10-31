import {handleAuth, handleCallback} from '@auth0/nextjs-auth0';

export default handleAuth({
  async callback(req, res) {
    if (
      req.query.error === 'access_denied' &&
      req.query.error_description === 'trial_expiration'
    ) {
      res.redirect(307, '/subscribe');
    }
    try {
      await handleCallback(req, res);
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
});
