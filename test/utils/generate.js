// adapted from: https://github.com/kentcdodds/testing-node-apps/blob/main/test/utils/generate.js
import {faker} from '@faker-js/faker';

function getEmail() {
  return faker.internet.email();
} // API reference: https://fakerjs.dev/api/internet.html#email

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

function getToken() {
  return faker.internet.password(64, false, /[A-Za-z0-9+/]/); // 64-character-long base64 string; see https://en.wikipedia.org/wiki/Base64#Base64_table_from_RFC_4648
} // API reference: https://fakerjs.dev/api/internet.html#password

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
    userId: getToken(),
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
    end: jest.fn().mockName('res.end'),
    json: jest.fn(() => res).mockName('res.json'),
    status: jest.fn(() => res).mockName('res.status'),
    ...overrides,
  };
  return res;
}

export {
  buildPlace,
  buildReq,
  buildRes,
  getEmail,
  getId,
  getNote,
  getPlaceName,
  getToken,
  getWord,
};
