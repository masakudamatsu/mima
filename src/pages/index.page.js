import {useState} from 'react';
import Head from 'next/head';
import {Wrapper} from '@googlemaps/react-wrapper';
import {getSession, withPageAuthRequired} from '@auth0/nextjs-auth0';
import {getAccessToken, getAppMetadata} from 'src/utils/callManagementApi';
import {statusType} from 'src/utils/type';

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
export default withPageAuthRequired(function HomePage({
  savedPlaces,
  userStatus,
}) {
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
        <Controls mapObject={mapObject} userStatus={userStatus} />
        <main
          id="map" // used in GlobalStyle.js
        >
          <Wrapper
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
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
    const accessToken = await getAccessToken();
    const {app_metadata} = await getAppMetadata({
      accessToken,
      userId: user.sub,
    });
    // Check if subscription period expires
    const today = new Date();
    const expirationDate = new Date(app_metadata['expiration_date']);
    if (today > expirationDate) {
      if (app_metadata['status'] === statusType.trial) {
        // Trial users
        return {
          redirect: {
            destination: '/subscribe',
            permanent: false,
          }, // API reference: https://nextjs.org/docs/api-reference/next.config.js/redirects
        };
      } else if (app_metadata['status'] === statusType.subscribed) {
        // Subscribed users
        return {
          redirect: {
            destination: '/renewal',
            permanent: false,
          }, // API reference: https://nextjs.org/docs/api-reference/next.config.js/redirects
        };
      } else if (app_metadata['status'] === statusType.unpaid) {
        // Subscription cancelled due to repeated failure of payment
        return {
          redirect: {
            destination: '/subscribe',
            permanent: false,
          }, // API reference: https://nextjs.org/docs/api-reference/next.config.js/redirects
        };
      } else {
        // Subscription cancelled by users themselves
        return {
          redirect: {
            destination: '/subscribe',
            permanent: false,
          }, // API reference: https://nextjs.org/docs/api-reference/next.config.js/redirects
        };
      }
    }
    // Retrieve user's saved places
    // TODO #282: handle database access error
    const savedPlaces = await prisma.place.findMany({
      where: {
        userId: user.sub,
      },
    }); // API ref: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#findmany
    return {
      props: {
        savedPlaces,
        userStatus: app_metadata['status'],
      },
    };
  },
});
