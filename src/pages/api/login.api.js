import {Magic} from '@magic-sdk/admin';
import {serialize} from 'cookie';
const prisma = require('src/utils/prisma');
const {encryptSession} = require('src/utils/iron');

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export default async function handleLogin(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  // Validate DID sent by HTTP request
  let did;
  try {
    did = magic.utils.parseAuthorizationHeader(req.headers.authorization);
    await magic.token.validate(did);
  } catch (error) {
    res.status(401).end();
    return;
  }
  let user;
  try {
    // Obtain the unique ID and email address of the user
    const {issuer, email} = await magic.users.getMetadataByToken(did);
    // https://magic.link/docs/auth/api-reference/server-side-sdks/node#getmetadatabytoken
    // issuer (String): The Decentralized ID of the user. We recommend this value to be used as the user ID in your own tables.
    // Add the user to the database if s/he is signing up
    user = await prisma.user.findUnique({
      where: {
        userId: issuer,
      },
    }); // API reference: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#findunique
    if (!user) {
      user = await prisma.user.create({
        data: {
          userId: issuer,
          email,
        },
      });
    }
  } catch (error) {
    console.error('Database not responding');
    res.status(500).end(); // 500 for database error; see https://stackoverflow.com/a/36252591
    return;
  }
  // encrypt the user ID
  const {userId} = user;
  let token;
  try {
    token = await encryptSession({userId});
  } catch (error) {
    console.error('User data encryption fails');
    res.status(500).end(); // 500 for database error; see https://stackoverflow.com/a/36252591
    return;
  }
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
}
