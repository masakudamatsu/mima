const {faker} = require('@faker-js/faker');

const mockUser1 = {
  userId: 'auth0|63758d34ecc33d71c8399095',
};
const mockUser2 = {
  userId: 'auth0|63758ee29cf81d16834bbea9',
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
    note: '<h2>Okaffe Kyoto</h2><p>https://okaffe.kyoto/menu/cafe_menu/</p>',
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
    note:
      '<h2>Bread & Espresso & Arashiyama Garden</h2><p>https://www.instagram.com/bread.espresso.and.arashiyama/</p>',
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
    note:
      '<h2>D&DEPARTMENT KYOTO d食堂 京都</h2><p>https://gotrip.jp/2019/05/113932/</p>',
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
    note:
      '<h2>Lorimer Kyoto</h2><p>https://www.asahi.com/and/article/20210806/407331671/</p>',
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
    note:
      '<h2>出逢ひ茶屋おせん</h2><p>https://www.asahi.com/and/article/20201225/300307708/</p>',
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
    note: '<h2>GION NITI</h2><p></p>',
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
    note:
      '<h2>Walden Woods Kyoto</h2><p>https://madamefigaro.jp/series/kyoto/181004-coffee.html</p>',
  },
  type: 'Feature',
  userId: mockUser1.userId,
};

// for testing places saved directly, not via Google Maps search
const mockPlace8 = {
  id: `place_${faker.datatype.uuid()}`, // API ref: https://fakerjs.dev/api/datatype.html#uuid
  geometry: {
    coordinates: [135.7712, 35.0064],
    type: 'Point',
  },
  properties: {
    address: '',
    'country code': '',
    'Google Maps URL': '',
    name: '先斗町公園',
    note:
      '<h2>先斗町公園</h2><p>A place saved directly by user, not via Google Maps search</p>',
  },
  type: 'Feature',
  userId: mockUser2.userId,
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
  mockPlace8,
};
