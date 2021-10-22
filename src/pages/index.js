import {useContext, useState, useEffect} from 'react';
import Head from 'next/head';
import {index} from 'src/utils/metadata';

import {NightModeContext} from 'src/context/NightModeContext';

import LocatorButton from 'src/components/LocatorButton';
import Map from 'src/components/Map';
import MenuButton from 'src/components/MenuButton';
import Noscript from 'src/components/Noscript';
import SavePlaceButton from 'src/components/SavePlaceButton';
import SearchButton from 'src/components/SearchButton';

function HomePage() {
  const [clientSideRendering, setClientSideRendering] = useState(false);
  useEffect(() => {
    setClientSideRendering(true);
  }, []);

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
      {/* {clientSideRendering && <MenuButton />}
      {clientSideRendering && <SearchButton />} */}
      {clientSideRendering && <LocatorButton mapObject={mapObject} />}
      {/* {clientSideRendering && <SavePlaceButton />} */}
      <Map setMapObject={setMapObject} />
    </>
  ); // see https://codepen.io/masakudamatsu/pen/QWpbELb
}

export default HomePage;
