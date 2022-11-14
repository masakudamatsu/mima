const {faker} = require('@faker-js/faker');

const mockUser1 = {
  userId: 'auth0|636755e9d6ab9f314234831c',
};
const mockUser2 = {
  userId: 'auth0|63706eb164a1988e31375f3f',
};

faker.seed(5678); // make place ID always the same; see https://github.com/faker-js/faker#%EF%B8%8F-setting-a-randomness-seed

const mockPlace1 = {
  id: `place_${faker.datatype.uuid()}`, // API ref: https://fakerjs.dev/api/datatype.html#uuid
  geometry: {
    coordinates: [135.7621503, 35.0023024],
    type: 'Point',
  },
  properties: {
    address: '235-2 Shinmeicho, Shimogyo Ward, Kyoto, 600-8092, Japan',
    'country code': 'JP',
    'Google Maps URL': 'http://maps.google.com/?cid=11397677192332095799',
    name: 'Okaffe Kyoto',
    note: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'https://okaffe.kyoto/menu/cafe_menu/',
          },
        ],
      },
    ],
  },
  type: 'Feature',
  userId: mockUser1.userId,
};

const mockPlace2 = {
  id: `place_${faker.datatype.uuid()}`, // API ref: https://fakerjs.dev/api/datatype.html#uuid
  geometry: {
    coordinates: [135.6749029, 35.0148675],
    type: 'Point',
  },
  properties: {
    address:
      '45-15 Sagatenryuji Susukinobabacho, Ukyo Ward, Kyoto, 616-8385, Japan',
    'country code': 'JP',
    'Google Maps URL': 'http://maps.google.com/?cid=1227974347151193049',
    name: 'Bread & Espresso & Arashiyama Garden',
    note: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'https://www.instagram.com/bread.espresso.and.arashiyama/',
          },
        ],
      },
    ],
  },
  type: 'Feature',
  userId: mockUser1.userId,
};

const mockPlace3 = {
  id: `place_${faker.datatype.uuid()}`, // API ref: https://fakerjs.dev/api/datatype.html#uuid
  geometry: {
    coordinates: [135.7628048, 35.0004696],
    type: 'Point',
  },
  properties: {
    address:
      'Japan, 〒600-8084 Kyoto, Shimogyo Ward, Shinkaicho, 397 本山佛光寺内',
    'country code': 'JP',
    'Google Maps URL': 'http://maps.google.com/?cid=5220687755832863894',
    name: 'D&DEPARTMENT KYOTO d食堂 京都',
    note: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'https://gotrip.jp/2019/05/113932/',
          },
        ],
      },
    ],
  },
  type: 'Feature',
  userId: mockUser2.userId,
};

const mockPlace4 = {
  id: `place_${faker.datatype.uuid()}`, // API ref: https://fakerjs.dev/api/datatype.html#uuid
  geometry: {
    coordinates: [135.7609794, 34.9936571],
    type: 'Point',
  },
  properties: {
    address: '143 Hashizumecho, Shimogyo Ward, Kyoto, 600-8183, Japan',
    'country code': 'JP',
    'Google Maps URL': 'http://maps.google.com/?cid=2755578752090318796',
    name: 'Lorimer Kyoto',
    note: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'https://www.asahi.com/and/article/20210806/407331671/',
          },
        ],
      },
    ],
  },
  type: 'Feature',
  userId: mockUser1.userId,
};

const mockPlace5 = {
  id: `place_${faker.datatype.uuid()}`, // API ref: https://fakerjs.dev/api/datatype.html#uuid
  geometry: {
    coordinates: [135.7700156, 35.006263],
    type: 'Point',
  },
  properties: {
    address: '307-1 Bizenjimacho, Nakagyo Ward, Kyoto, 604-8023, Japan',
    'country code': 'JP',
    'Google Maps URL': 'http://maps.google.com/?cid=14329270928985000839',
    name: '出逢ひ茶屋おせん',
    note: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'https://www.asahi.com/and/article/20201225/300307708/',
          },
        ],
      },
    ],
  },
  type: 'Feature',
  userId: mockUser2.userId,
};

const mockPlace6 = {
  id: `place_${faker.datatype.uuid()}`, // API ref: https://fakerjs.dev/api/datatype.html#uuid
  geometry: {
    coordinates: [135.7749319, 35.0018511],
    type: 'Point',
  },
  properties: {
    address:
      '570-8 Gionmachi Minamigawa, Higashiyama Ward, Kyoto, 605-0074, Japan',
    'country code': 'JP',
    'Google Maps URL': 'http://maps.google.com/?cid=13724563353852976456',
    name: 'GION NITI',
    note: [
      {
        type: 'paragraph',
        children: [
          {
            text: '',
          },
        ],
      },
    ],
  },
  type: 'Feature',
  userId: mockUser1.userId,
};

const mockPlace7 = {
  id: `place_${faker.datatype.uuid()}`, // API ref: https://fakerjs.dev/api/datatype.html#uuid
  geometry: {
    coordinates: [135.7631616, 34.9933458],
    type: 'Point',
  },
  properties: {
    address: '508-1 Sakaecho, Shimogyo Ward, Kyoto, 600-8194, Japan',
    'country code': 'JP',
    'Google Maps URL': 'http://maps.google.com/?cid=17532417395355382157',
    name: 'Walden Woods Kyoto',
    note: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'https://madamefigaro.jp/series/kyoto/181004-coffee.html',
          },
        ],
      },
    ],
  },
  type: 'Feature',
  userId: mockUser1.userId,
};

module.exports = {
  mockUser1,
  mockUser2,
  mockPlace1,
  mockPlace2,
  mockPlace3,
  mockPlace4,
  mockPlace5,
  mockPlace6,
  mockPlace7,
};
