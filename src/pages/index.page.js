import {useState} from 'react';
import Head from 'next/head';
import {Wrapper} from '@googlemaps/react-wrapper';
import {getSession, withPageAuthRequired} from '@auth0/nextjs-auth0';
import {getAccessToken, getAppMetadata} from 'src/utils/callManagementApi';

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

// wrap with withPageAuthRequired so any fetch request to API routes will be attached with access token
// https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md#protect-an-api-route
export default withPageAuthRequired(function HomePage({savedPlaces}) {
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
});

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({req, res}) {
    // Retrieve the subscription expiration date
    const {user} = await getSession(req, res);
    console.log(user.sub);
    const accessToken = await getAccessToken();
    console.log(accessToken);
    const {app_metadata} = await getAppMetadata({
      accessToken,
      userId: user.sub,
    });
    // Check if subscription period expires
    const today = new Date();
    const expirationDate = new Date(app_metadata['trial_expiration_date']);
    if (today > expirationDate) {
      return {
        redirect: {
          destination: '/subscribe',
          permanent: false,
        }, // API reference: https://nextjs.org/docs/api-reference/next.config.js/redirects
      }; // Docs: https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#redirect
    }
    // Retrieve user's saved places
    const savedPlaces = await prisma.place.findMany();
    return {props: {savedPlaces}};
  },
});
