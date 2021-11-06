import {useContext, useState, useEffect} from 'react';
import Head from 'next/head';
import {index} from 'src/utils/metadata';

import {NightModeContext} from 'src/context/NightModeContext';

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
      <Map setMapObject={setMapObject} />
    </>
  );
}

export default HomePage;
