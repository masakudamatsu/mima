import {handleAuth, handleLogout} from '@auth0/nextjs-auth0';

export default handleAuth({
  async logout(req, res) {
    try {
      // source: https://github.com/auth0/nextjs-auth0/issues/583#issuecomment-1020703725
      await handleLogout(req, res, {
        returnTo: '/login',
      });
    } catch (error) {
      // source: https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md#customize-handlers-behavior
      res.status(error.status || 400).end(error.message);
    }
  },
});
