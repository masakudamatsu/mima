import {useContext, useState} from 'react';
import PropTypes from 'prop-types';

import {NightModeContext} from 'src/context/NightModeContext';

import {Button} from 'src/elements/Button';
import SvgCloud from 'src/elements/SvgCloud';
import {color} from 'src/utils/designtokens';

let marker = null;
let accuracyCircle = null;
// these needs to be outside the component
// because setLoading(true) causes the rerendering of the component

const LocatorButton = ({mapObject}) => {
  const nightMode = useContext(NightModeContext);
  const [loading, setLoading] = useState(false);
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(async position => {
        // obtain current location geocoordinate
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        await mapObject.setCenter(pos);
        // obtain the 95% confidence interval
        const accuracyRange = position.coords.accuracy;
        // remove the previous current location marker from the map
        if (marker) {
          marker.setMap(null);
        }
        if (accuracyCircle) {
          accuracyCircle.setMap(null);
        }
        // create the current location marker
        const google = window.google;
        const blueCircle = {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: color['google-blue 100'],
          fillOpacity: 1,
          scale: 8,
          strokeColor: color['white 100'],
          strokeWeight: 2,
        }; // source: https://github.com/ChadKillingsworth/geolocation-marker/releases/download/v2.0.5/geolocation-marker.js
        marker = new google.maps.Marker({
          icon: blueCircle,
          position: pos,
          title: 'You are here!',
        });
        marker.setMap(mapObject);
        accuracyCircle = new google.maps.Circle({
          center: pos,
          fillColor: color['google-blue-dark 100'],
          fillOpacity: 0.4,
          radius: accuracyRange,
          strokeColor: color['google-blue-light 100'],
          strokeOpacity: 0.4,
          strokeWeight: 1,
          zIndex: 1,
        }); // source: https://github.com/ChadKillingsworth/geolocation-marker/releases/download/v2.0.5/geolocation-marker.js
        accuracyCircle.setMap(mapObject);
        setLoading(false);
      });
    } else {
      // Browser doesn't support Geolocation
    }
  };
  return (
    <Button
      data-darkmode={nightMode}
      data-position="bottom-right-second"
      data-loading={loading}
      onClick={getCurrentLocation}
      type="button"
    >
      <SvgCloud icon="flightTakeoff" title="Show current location" />
    </Button>
  );
};

LocatorButton.propTypes = {
  mapObject: PropTypes.object.isRequired,
};

export default LocatorButton;
