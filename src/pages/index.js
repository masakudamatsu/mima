import Head from 'next/head';
import {useState} from 'react';
import {index} from 'src/utils/metadata';

import LocatorButton from 'src/components/LocatorButton';
import Map from 'src/components/Map';
import MenuButton from 'src/components/MenuButton';
import Noscript from 'src/components/Noscript';
import SavePlaceButton from 'src/components/SavePlaceButton';
import SearchButton from 'src/components/SearchButton';

function HomePage() {
  let nightMode;
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  if (currentHour < 6 || currentHour >= 18) {
    nightMode = true;
  } else {
    nightMode = false;
  }
  return (
    <>
      <Head>
        <title>{index.title}</title>
        <meta name="description" content={index.description} />
      </Head>
      <Noscript />
      <MenuButton />
      <SearchButton />
      <LocatorButton />
      <SavePlaceButton />
      <Map nightMode={nightMode} />
    </>
  ); // see https://codepen.io/masakudamatsu/pen/QWpbELb
}

export default HomePage;
