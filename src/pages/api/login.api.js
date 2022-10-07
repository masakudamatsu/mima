import {Magic} from '@magic-sdk/admin';

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export default async function handleLogin(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    // Validate DID sent by HTTP request
    const did = magic.utils.parseAuthorizationHeader(req.headers.authorization);
    await magic.token.validate(did);
    res.status(200).end();
  } catch (error) {
    res.status(401).end();
  }
}
