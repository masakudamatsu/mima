import Head from 'next/head';
import {useEffect, useRef} from 'react';
import {Loader} from '@googlemaps/js-api-loader';

import {index} from 'src/utils/metadata';
import DivMap from 'src/elements/DivMap';
import Noscript from 'src/components/Noscript';

function HomePage() {
  const googlemap = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      version: 'weekly',
    });

    let map; // in response to ESLint warning: "Assignments to the 'map' variable from inside React Hook use Effect will be lost after each render. To preserve the value over time, store it in a useRef Hook and keep the mutable value in the '.current' property. Oth erwise, you can move this variable directly inside useEffect"
    loader.load().then(() => {
      const google = window.google;
      // eslint-disable-next-line no-unused-vars
      map = new google.maps.Map(googlemap.current, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8,
      });
    });
  });

  return (
    <>
      <Head>
        <title>{index.title}</title>
        <meta name="description" content={index.description} />
      </Head>
      <Noscript />
      <DivMap id="map" ref={googlemap} />
    </>
  ); // see https://codepen.io/masakudamatsu/pen/QWpbELb
}

export default HomePage;
