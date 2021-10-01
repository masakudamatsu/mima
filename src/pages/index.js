import {useState, useEffect} from 'react';
import Head from 'next/head';
import {index} from 'src/utils/metadata';

import {NightModeProvider} from 'src/context/NightModeContext';

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
  return (
    <>
      <Head>
        <title>{index.title}</title>
        <meta name="description" content={index.description} />
      </Head>
      <Noscript />
      <NightModeProvider>
        {clientSideRendering && <MenuButton />}
        {clientSideRendering && <SearchButton />}
        {clientSideRendering && <LocatorButton />}
        {clientSideRendering && <SavePlaceButton />}
        <Map />
      </NightModeProvider>
    </>
  ); // see https://codepen.io/masakudamatsu/pen/QWpbELb
}

export default HomePage;
