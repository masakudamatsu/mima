import {useContext, useState} from 'react';
import PropTypes from 'prop-types';

import {NightModeContext} from 'src/context/NightModeContext';

import {Button} from 'src/elements/Button';
import SvgCloud from 'src/elements/SvgCloud';
import {color} from 'src/utils/designtokens';

let marker = null;
let accuracyCircle = null;
let watchId;
// these needs to be outside the component
// because setStatus() causes the rerendering of the component, assigning null to these variables

const LocatorButton = ({mapObject}) => {
  const nightMode = useContext(NightModeContext);
  const [status, setStatus] = useState('landed');
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      // Start blinking the button
      setStatus('taking-off');
      watchId = navigator.geolocation.watchPosition(
        position => {
          // obtain current location geocoordinate
          const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // Move the map to the current location
          mapObject.setCenter(currentPosition);

          // prepare for drawing markers
          const google = window.google;

          // Mark the current location
          if (marker) {
            marker.setMap(null); // remove the previous current location marker from the map
          }
          const blueCircle = {
            // design the icon to mark the current location
            // source: lines 50-55 of https://github.com/ChadKillingsworth/geolocation-marker/releases/download/v2.0.5/geolocation-marker.js
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: color['google-blue 100'],
            fillOpacity: 1,
            scale: 8,
            strokeColor: color['white 100'],
            strokeWeight: 2,
          };
          marker = new google.maps.Marker({
            icon: blueCircle,
            position: currentPosition,
            title: 'You are here!',
          });
          marker.setMap(mapObject);

          // Draw the circle indicationg the 95% confidence interval of current position
          const accuracyRange = position.coords.accuracy; // obtain the 95% confidence interval
          if (accuracyCircle) {
            accuracyCircle.setMap(null); // remove the previous circle from the map
          }
          accuracyCircle = new google.maps.Circle({
            // source: lines 65-72 of https://github.com/ChadKillingsworth/geolocation-marker/releases/download/v2.0.5/geolocation-marker.js
            center: currentPosition,
            fillColor: color['google-blue-dark 100'],
            fillOpacity: 0.4,
            radius: accuracyRange,
            strokeColor: color['google-blue-light 100'],
            strokeOpacity: 0.4,
            strokeWeight: 1,
            zIndex: 1,
          });
          accuracyCircle.setMap(mapObject);

          // Stop blinking the button
          setStatus('flying');
        },
        () => {},
        {maximumAge: 1000}, // people walk at 1.4m per second; typically accurracy error is about the same (source: https://en.wikipedia.org/wiki/Preferred_walking_speed#:~:text=Many%20people%20tend%20to%20walk,they%20typically%20choose%20not%20to.)
      );
    } else {
      // Browser doesn't support Geolocation
    }
  };
  const stopTracking = () => {
    setStatus('landing');
    navigator.geolocation.clearWatch(watchId);
    marker.setMap(null);
    accuracyCircle.setMap(null);
    setStatus('landed');
  };
  return status === 'landed' || status === 'taking-off' ? (
    <Button
      data-darkmode={nightMode}
      data-position="bottom-right-second"
      data-loading={status === 'taking-off'}
      onClick={getCurrentLocation}
      type="button"
    >
      <SvgCloud icon={'flightTakeoff'} title={'Show current location'} />
    </Button>
  ) : (
    <Button
      data-darkmode={nightMode}
      data-position="bottom-right-second"
      data-loading={status === 'landing'}
      onClick={stopTracking}
      type="button"
    >
      <SvgCloud
        icon={'flightLanding'}
        title={'Stop tracking current location'}
      />
    </Button>
  );
};

LocatorButton.propTypes = {
  mapObject: PropTypes.object.isRequired,
};

export default LocatorButton;
