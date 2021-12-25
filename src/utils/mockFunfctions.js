// Mock Places API methods

export const mockGetPlacePredictions = jest
  .fn()
  .mockName('getPlacePredictions');

const crypto = require('crypto');
const mockAutocompleteSessionToken = jest.fn(() => {
  return {Vl: crypto.randomBytes(16).toString('hex')}; // https://www.geeksforgeeks.org/node-js-crypto-randombytes-method/
});

export function mockPlacesApi() {
  global.google = {
    maps: {
      places: {
        AutocompleteService: jest.fn(() => {
          return {
            getPlacePredictions: mockGetPlacePredictions,
          };
        }),
        AutocompleteSessionToken: mockAutocompleteSessionToken,
      },
    },
  };
}
