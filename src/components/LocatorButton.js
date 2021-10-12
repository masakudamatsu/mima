import {useContext, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import {NightModeContext} from 'src/context/NightModeContext';

import {Button} from 'src/elements/Button';
import SvgCloud from 'src/elements/SvgCloud';
import {color} from 'src/utils/designtokens';
import {locatorButtonLabel} from 'src/utils/uiCopies';

let marker = null;
let accuracyCircle = null;
// these needs to be outside the component
// because setStatus() causes the rerendering of the component, assigning null to these variables

const LocatorButton = ({mapObject}) => {
  // UI states
  const nightMode = useContext(NightModeContext);
  const [loading, setLoading] = useState(false);
  const [isWatching, setIsWatching] = useState(false);

  const currentPosition = useRef(null);

  const trackCurrentLocation = () => {
    if (navigator.geolocation) {
      // Start blinking the button
      setLoading(true);
      // First-run of extracting GPS info
      navigator.geolocation.getCurrentPosition(
        position => {
          currentPosition.current = updateCurrentPositionCoordinates(position);
          markCurrentLocation({currentPosition, mapObject, position});
          // Move to the current location
          mapObject.setCenter(currentPosition.current);
          // Stop blinking the button
          setLoading(false);
          // Rerender the button
          setIsWatching(true);
          // Enable continuous extraction of GPS info
          navigator.geolocation.watchPosition(
            position => {
              currentPosition.current = updateCurrentPositionCoordinates(
                position,
              );
              markCurrentLocation({currentPosition, mapObject, position});
            },
            () => {},
            {maximumAge: 1000},
          );
        },
        () => {},
        {maximumAge: 1000},
      );
    } else {
      // Browser doesn't support Geolocation
    }
  };

  const moveToCurrentLocation = () => {
    setLoading(true);
    mapObject.setCenter(currentPosition.current);
    setLoading(false);
  };

  return !isWatching ? (
    <Button
      data-darkmode={nightMode}
      data-position="bottom-right-second"
      data-loading={loading}
      onClick={trackCurrentLocation}
      type="button"
    >
      <SvgCloud icon={'flightTakeoff'} title={locatorButtonLabel.default} />
    </Button>
  ) : (
    <Button
      data-darkmode={nightMode}
      data-position="bottom-right-second"
      data-loading={loading}
      onClick={moveToCurrentLocation}
      type="button"
    >
      <SvgCloud icon={'flightLanding'} title={locatorButtonLabel.activated} />
    </Button>
  );
};

LocatorButton.propTypes = {
  mapObject: PropTypes.object.isRequired,
};

export default LocatorButton;

// helper functions

function updateCurrentPositionCoordinates(position) {
  return {lat: position.coords.latitude, lng: position.coords.longitude};
}

function markCurrentLocation({currentPosition, mapObject, position}) {
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
    position: currentPosition.current,
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
    center: currentPosition.current,
    fillColor: color['google-blue-dark 100'],
    fillOpacity: 0.4,
    radius: accuracyRange,
    strokeColor: color['google-blue-light 100'],
    strokeOpacity: 0.4,
    strokeWeight: 1,
    zIndex: 1,
  });
  accuracyCircle.setMap(mapObject);
}
