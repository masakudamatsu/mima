// Jest doesn't read the .env file; we need to set it to be a fake value on our own
// See discussions in https://stackoverflow.com/q/50259025
const mockSecret =
  '4b51e643126aabadb28fc6c541cc1190276082beff3c422fa375ac10ea5fd02c'; // generated with `openssl rand -hex 32` in terminal; Iron.seal requires at least 32 characters for a secret
process.env.ENCRYPTION_SECRET = mockSecret;
