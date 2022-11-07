// Adapted from https://community.auth0.com/t/introducing-auth0s-next-js-sdk/59522/14
import {handleLogin} from '@auth0/nextjs-auth0';

export default async function signupHandler(req, res) {
  handleLogin(req, res, {
    authorizationParams: {
      screen_hint: 'signup', // https://auth0.com/docs/authenticate/login/auth0-universal-login/new-experience#signup
    },
  });
}
