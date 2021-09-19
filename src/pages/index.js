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
  return (
    <>
      <Head>
        <title>{index.title}</title>
        <meta name="description" content={index.description} />
      </Head>
      <Noscript />
      <NightModeProvider>
        <MenuButton />
        <SearchButton />
        <LocatorButton />
        <SavePlaceButton />
        <Map />
      </NightModeProvider>
    </>
  ); // see https://codepen.io/masakudamatsu/pen/QWpbELb
}

export default HomePage;
