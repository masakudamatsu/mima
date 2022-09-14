const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const place1 = await prisma.place.create({
    data: {
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
    },
  });

  const place2 = await prisma.place.create({
    data: {
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
                text:
                  'https://www.instagram.com/bread.espresso.and.arashiyama/',
              },
            ],
          },
        ],
      },
      type: 'Feature',
    },
  });
  const place3 = await prisma.place.create({
    data: {
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
    },
  });
  const place4 = await prisma.place.create({
    data: {
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
    },
  });
  const place5 = await prisma.place.create({
    data: {
      geometry: {
        coordinates: [135.6762773, 35.013867],
        type: 'Point',
      },
      properties: {
        address:
          '3-16 Sagatenryuji Susukinobabacho, Ukyo Ward, Kyoto, 616-8385, Japan',
        'country code': 'JP',
        'Google Maps URL': 'http://maps.google.com/?cid=540503174389752899',
        name: 'Fukuda Art Museum',
        note: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'https://bunshun.jp/articles/-/14067',
              },
            ],
          },
        ],
      },
      type: 'Feature',
    },
  });
  const place6 = await prisma.place.create({
    data: {
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
    },
  });
  const place7 = await prisma.place.create({
    data: {
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
    },
  });
  const place8 = await prisma.place.create({
    data: {
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
    },
  });
  console.log([place1, place2, place3, place4, place5, place6, place7, place8]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
