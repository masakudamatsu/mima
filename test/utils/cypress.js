// source: https://blog.dai.codes/cypress-loading-state-tests/
export function interceptIndefinitely(requestMatcher, response) {
  let sendResponse;
  const trigger = new Promise(resolve => {
    sendResponse = resolve;
  });
  // eslint-disable-next-line no-undef
  cy.intercept(requestMatcher, request => {
    return trigger.then(() => {
      request.reply(response);
    });
  });
  return {sendResponse};
}
