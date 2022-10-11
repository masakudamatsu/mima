// Mocking npm module: https://jestjs.io/docs/manual-mocks#examples
const mock = jest.createMockFromModule('@magic-sdk/admin');

// Mocking ES6 class: https://jestjs.io/docs/es6-class-mocks#manual-mock
export const mockValidate = jest.fn().mockName('validate');
export const mockGetMetadataByToken = jest.fn().mockName('getMetadataByToken');
export const mockLogoutByIssuer = jest.fn().mockName('logoutByIssuer');
export const Magic = jest.fn().mockImplementation(() => {
  return {
    token: {validate: mockValidate},
    users: {
      getMetadataByToken: mockGetMetadataByToken,
      logoutByIssuer: mockLogoutByIssuer,
    },
    utils: {
      parseAuthorizationHeader: jest.fn(header => header.substr(7)),
    },
  };
});

export default mock;
