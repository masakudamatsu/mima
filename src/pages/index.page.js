import {useState} from 'react';
import Head from 'next/head';
import {Wrapper} from '@googlemaps/react-wrapper';

import {index} from 'src/utils/metadata';

import {NightModeContext} from 'src/wrappers/NightModeContext';
import {PlaceIdProvider} from 'src/wrappers/PlaceIdContext';
import {Controls} from 'src/components/Controls';
import {Map} from 'src/components/Map';
import {Noscript} from 'src/components/Noscript';
import {Places} from 'src/components/Places';
import {SavedPlaces} from 'src/components/SavedPlaces';
import {SearchedPlace} from 'src/components/SearchedPlace';

import {useNightMode} from 'src/hooks/useNightMode';

const prisma = require('src/utils/prisma');
const {decryptToken} = require('src/utils/iron');

function HomePage({savedPlaces, error = false}) {
  useNightMode(NightModeContext);

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
            <Places placeData={savedPlaces}>
              <SavedPlaces mapObject={mapObject} />
              <SearchedPlace mapObject={mapObject} />
            </Places>
          </Wrapper>
        </main>
      </PlaceIdProvider>
    </>
  );
}

export default HomePage;

export async function getServerSideProps({req}) {
  // API reference: https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#context-parameter
  let user;
  try {
    user = await decryptToken(req.cookies['api_token']);
    if (!user) {
      throw new Error();
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }, // API reference: https://nextjs.org/docs/api-reference/next.config.js/redirects
    }; // Docs: https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#redirect
  }
  try {
    const savedPlaces = await prisma.place.findMany({
      where: {
        userId: user.userId,
      },
    });
    return {props: {savedPlaces}};
  } catch (error) {
    return {props: {savedPlaces: null, error: true}};
  }
}
