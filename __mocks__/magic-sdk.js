// Mocking npm module: https://jestjs.io/docs/manual-mocks#examples
const mock = jest.createMockFromModule('magic-sdk');

// Mocking ES6 class: https://jestjs.io/docs/es6-class-mocks#manual-mock
export const mockLoginWithMagicLink = jest.fn().mockName('loginWithMagicLink');
export const Magic = jest.fn().mockImplementation(() => {
  return {auth: {loginWithMagicLink: mockLoginWithMagicLink}};
});

export default mock;
