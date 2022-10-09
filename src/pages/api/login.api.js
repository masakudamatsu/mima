import {Magic} from '@magic-sdk/admin';
import {serialize} from 'cookie';
const {encryptSession} = require('src/utils/iron');

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export default async function handleLogin(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    // Validate DID sent by HTTP request
    const did = magic.utils.parseAuthorizationHeader(req.headers.authorization);
    await magic.token.validate(did);

    // Obtain the unique ID of the user
    const {issuer} = await magic.users.getMetadataByToken(did);
    // https://magic.link/docs/auth/api-reference/server-side-sdks/node#getmetadatabytoken
    // issuer (String): The Decentralized ID of the user. We recommend this value to be used as the user ID in your own tables.

    // encrypt the user ID
    const token = await encryptSession(issuer);
    // Author a cookie to persist a users session
    const MAX_AGE = 60 * 60 * 24 * 7; // 7 days
    // https://magic.link/docs/auth/more/customization/session-management
    // Default sessions will allow users to remain authenticated with Magic for up to 7 days (or until they logout or browser data is cleared).
    const cookie = serialize('api_token', token, {
      expires: new Date(Date.now() + MAX_AGE * 1000),
      httpOnly: true,
      maxAge: MAX_AGE,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production', // when to be sent only via HTTPS connections
    }); // API docs: https://github.com/jshttp/cookie#cookieserializename-value-options
    // Send the cookie
    res.setHeader('Set-Cookie', cookie);
    res.end();
  } catch (error) {
    res.status(401).end();
  }
}
