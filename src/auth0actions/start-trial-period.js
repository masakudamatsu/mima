/**
 * Handler that will be called during the execution of a PreUserRegistration flow.
 *
 * @param {Event} event - Details about the context and user that is attempting to register.
 * @param {PreUserRegistrationAPI} api - Interface whose methods can be used to change the behavior of the signup.
 */
exports.onExecutePreUserRegistration = async (event, api) => {
  const today = new Date();

  const expirationDate = new Date();
  expirationDate.setDate(today.getDate() + 30);

  api.user.setAppMetadata('expiration_date', expirationDate);
};
