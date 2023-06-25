/**
 * Handler that will be called during the execution of a PreUserRegistration flow.
 *
 * @param {Event} event - Details about the context and user that is attempting to register.
 * @param {PreUserRegistrationAPI} api - Interface whose methods can be used to change the behavior of the signup.
 */
exports.onExecutePreUserRegistration = async (event, api) => {
  const today = new Date();
  const expirationDate = add14days(today);

  api.user.setAppMetadata('expiration_date', expirationDate);
  api.user.setAppMetadata('status', 'trial');
};

/**
 * @param {Date} date
 */
function add14days(date) {
  // Type checking
  if (date === undefined) {
    throw new Error('The input is missing. Provide a Date object.');
  }
  if (Object.prototype.toString.call(date) !== '[object Date]') {
    throw new Error(
      `'The input must be a Date object, but you provided a ${typeof date}`,
    );
  }
  // Main code
  return new Date(date.setDate(date.getDate() + 14));
}

// For the purpose of testing locally
export {add14days};
