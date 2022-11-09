/**
 * Handler that will be called during the execution of a PreUserRegistration flow.
 *
 * @param {Event} event - Details about the context and user that is attempting to register.
 * @param {PreUserRegistrationAPI} api - Interface whose methods can be used to change the behavior of the signup.
 */
exports.onExecutePreUserRegistration = async (event, api) => {
  const today = new Date();
  const expirationDate = addOneMonth(today);

  api.user.setAppMetadata('expiration_date', expirationDate);
  api.user.setAppMetadata('status', 'trial');
};

/**
 * @param {Date} date
 */
function addOneMonth(date) {
  // adapted from https://stackoverflow.com/a/12793246
  var d = date.getDate();
  date.setMonth(date.getMonth() + 1);
  if (date.getDate() !== d) {
    date.setDate(0);
  }
  return date;
}

// For the purpose of testing locally
export {addOneMonth};
