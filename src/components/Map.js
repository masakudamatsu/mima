import {useEffect, useRef} from 'react';
import {Loader} from '@googlemaps/js-api-loader';

import DivMap from 'src/elements/DivMap';

const Map = () => {
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
        center: {lat: 35.011636, lng: 135.768029}, // Kyoto (https://www.countrycoordinate.com/city-kyoto-japan/)
        zoom: 17,
        mapId: '83a67631594fbfff',
        // Disable the default UI control buttons
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
      });
    });
  });

  return <DivMap ref={googlemap} />;
};

export default Map;
