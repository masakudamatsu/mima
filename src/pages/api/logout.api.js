// adapted from https://magic.link/posts/magic-jwt#logging-a-user-out

import {Magic} from '@magic-sdk/admin';
import {serialize} from 'cookie';
import {decryptToken} from 'src/utils/iron';

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export default async function handleLogout(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  // check the presence of a session token in the request
  if (!req.cookies || !req.cookies['api_token']) {
    console.error('No cookie was provided to /api/logout.');
    return res.status(401).json({message: 'User is not logged in.'});
  }
  try {
    // retrieve user ID from session token; decryption failure throws an error
    const {userId} = await decryptToken(req.cookies['api_token']);

    // check if the session token contains user ID
    if (!userId) {
      console.error('No user ID was found in the session token');
      return res.status(401).json({message: 'User is not logged in.'});
    }
    // log the user out from Magic; if it's already expired, move on
    try {
      await magic.users.logoutByIssuer(userId);
    } catch (error) {
      console.error('User session with Magic has already expired');
    }
    // send an empty cookie that already expires to remove the cookie
    const cookie = serialize('api_token', '', {
      maxAge: -1,
      path: '/',
    });
    res.setHeader('Set-Cookie', cookie);
    res.end();
  } catch (error) {
    // should be reached only when decryptToken throws an error
    console.error('Session token was encrypted with a wrong secret');
    res.status(401).json({message: 'User is not logged in.'});
  }
}
