import {useContext, useState, useEffect} from 'react';
import Head from 'next/head';
import {Wrapper} from '@googlemaps/react-wrapper';

import {index} from 'src/utils/metadata';

import {NightModeContext} from 'src/wrappers/NightModeContext';
import {PlaceIdProvider} from 'src/wrappers/PlaceIdContext';
import {Controls} from 'src/components/Controls';
import {Map} from 'src/components/Map';
import {Noscript} from 'src/components/Noscript';
import {SavedPlaces} from 'src/components/SavedPlaces';
import {SearchedPlace} from 'src/components/SearchedPlace';

function HomePage({savedPlaces}) {
  const nightMode = useContext(NightModeContext);
  useEffect(() => {
    document.body.dataset.darkmode = nightMode;
  }, [nightMode]);

  const [mapObject, setMapObject] = useState(null);
  return (
    <>
      <Head>
        <title>{index.title}</title>
        <meta name="description" content={index.description} />
      </Head>
      <Noscript />
      <PlaceIdProvider>
        <Controls mapObject={mapObject} />
        <main>
          <Wrapper
            apiKey={process.env.NEXT_PUBLIC_API_KEY}
            version="weekly"
            libraries={['places']}
          >
            <Map setMapObject={setMapObject} />
            <SavedPlaces mapObject={mapObject} placeData={savedPlaces} />
            <SearchedPlace mapObject={mapObject} />
          </Wrapper>
        </main>
      </PlaceIdProvider>
    </>
  );
}

export default HomePage;

export async function getServerSideProps() {
  const savedPlaces = [
    {
      id: 0,
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
    {
      id: 1,
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
    {
      id: 2,
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
    {
      id: 3,
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
    {
      id: 4,
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
    {
      id: 5,
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
    {
      id: 6,
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
    {
      id: 7,
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
  ];
  return {props: {savedPlaces}};
}
