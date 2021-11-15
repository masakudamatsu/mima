import {useContext, useState, useEffect} from 'react';
import Head from 'next/head';
import {Wrapper} from '@googlemaps/react-wrapper';

import {index} from 'src/utils/metadata';

import {NightModeContext} from 'src/wrappers/NightModeContext';

import {Controls} from 'src/components/Controls';
import {Map} from 'src/components/Map';
import {Noscript} from 'src/components/Noscript';

function HomePage() {
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
      <Controls mapObject={mapObject} />
      <Wrapper apiKey={process.env.NEXT_PUBLIC_API_KEY} version="weekly">
        <Map setMapObject={setMapObject} />
      </Wrapper>
    </>
  );
}

export default HomePage;
