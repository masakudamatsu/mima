const mockUser1 = {
  userId: 'a2c6758929c3e61a0b29e2fd3e5fc9129d237f9612386cb33a71a031b838219f',
  email: 'user1@gmail.com',
};
const mockUser2 = {
  userId: 'a8b5b65a15d28f76752e45d7c30a7398afe07b9eb7375f57010abbdc65335b32',
  email: 'user2@yahoo.co.jp',
};
const mockPlace1 = {
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
