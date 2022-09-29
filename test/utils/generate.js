// adapted from: https://github.com/kentcdodds/testing-node-apps/blob/main/test/utils/generate.js
import {faker} from '@faker-js/faker';

function getId() {
  return faker.random.numeric();
}

function getNote() {
  return {
    type: 'paragraph',
    children: [
      {
        text: faker.lorem.paragraph(),
      },
    ],
  };
}

function getPlaceName() {
  return faker.company.name();
}

function getWord() {
  return faker.lorem.word();
}

function buildPlace(overrides) {
  return {
    geometry: {
      coordinates: [faker.address.longitude(), faker.address.latitude()],
      type: 'Point',
    },
    properties: {
      address: faker.address.streetAddress(),
      'Google Maps URL': faker.internet.url(),
      name: getPlaceName(),
      note: [getNote()],
    },
    type: 'Feature',
    ...overrides,
  };
}

function buildReq(overrides = {}) {
  const req = {body: {}, params: {}, ...overrides};
  return req;
}

// TODO: Replace buildReq with the following once the login feature is added to the app
// function buildReq({user = buildUser(), ...overrides} = {}) {
//   const req = {user, body: {}, params: {}, ...overrides};
//   return req;
// }

function buildRes(overrides = {}) {
  const res = {
    json: jest.fn(() => res).mockName('json'),
    status: jest.fn(() => res).mockName('status'),
    ...overrides,
  };
  return res;
}

export {buildPlace, buildReq, buildRes, getId, getNote, getPlaceName, getWord};
