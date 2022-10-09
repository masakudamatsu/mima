const Iron = require('@hapi/iron'); // `import` cannot be used for Cypress, it seems...

async function encryptSession(session) {
  const token = await Iron.seal(
    session,
    process.env.ENCRYPTION_SECRET,
    Iron.defaults,
  ); // API reference: https://hapi.dev/module/iron/api/?v=7.0.0#await-sealobject-password-options
  return token;
}

module.exports = {
  encryptSession,
};
