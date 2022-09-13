import {useContext, useState, useEffect} from 'react';
import Head from 'next/head';
import {Wrapper} from '@googlemaps/react-wrapper';
import {PrismaClient} from '@prisma/client';

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
  const prisma = new PrismaClient();
  const savedPlaces = await prisma.place.findMany();
  return {props: {savedPlaces}};
}
