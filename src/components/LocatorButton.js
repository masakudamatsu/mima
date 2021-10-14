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

const flightIcon = {
  height: 24,
  path: `
    M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z
  `,
  width: 24,
};

const LocatorButton = ({mapObject}) => {
  // UI states
  const nightMode = useContext(NightModeContext);
  const [loading, setLoading] = useState(false);
  const [isWatching, setIsWatching] = useState(false);

  const currentPosition = useRef(null);
  const currentDirection = useRef(45); // to match the button label icon

  const trackCurrentLocation = () => {
    if (navigator.geolocation) {
      // Start blinking the button
      setLoading(true);
      // First-run of extracting GPS info
      navigator.geolocation.getCurrentPosition(
        position => {
          currentPosition.current = updateCurrentPositionCoordinates(position);
          markCurrentLocation({
            currentDirection,
            currentPosition,
            mapObject,
            position,
          });
          // Move to the current location
          mapObject.setCenter(currentPosition.current);
          // Stop blinking the button
          setLoading(false);
          // Rerender the button
          setIsWatching(true);
          // Enable continuous extraction of GPS info
          navigator.geolocation.watchPosition(
            position => {
              const previousPosition = currentPosition.current;
              console.log(
                `previous position: (${previousPosition.lng}, ${previousPosition.lat})`,
              );
              currentPosition.current = updateCurrentPositionCoordinates(
                position,
              );
              console.log(
                `current position: (${currentPosition.current.lng}, ${currentPosition.current.lat})`,
              );
              const diffLat =
                currentPosition.current.lat - previousPosition.lat;
              console.log(`change in latitude: ${diffLat}`);
              const diffLng =
                currentPosition.current.lng - previousPosition.lng;
              console.log(`change in longitude: ${diffLng}`);
              const direction =
                90 - (Math.atan2(diffLat, diffLng) * 180) / Math.PI;
              console.log(`direction in degree: ${direction}`);
              currentDirection.current = direction;
              markCurrentLocation({
                currentDirection,
                currentPosition,
                mapObject,
                position,
              });
            },
            () => {},
            {maximumAge: 0},
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
      <SvgCloud icon={'flightFlying'} title={locatorButtonLabel.activated} />
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

function markCurrentLocation({
  currentDirection,
  currentPosition,
  mapObject,
  position,
}) {
  // prepare for drawing markers
  const google = window.google;

  // Mark the current location
  if (marker) {
    marker.setMap(null); // remove the previous current location marker from the map
  }
  const svgIcon = {
    // design the icon to mark the current location
    // source: Material Icons Flight: https://fonts.google.com/icons?icon.query=flight
    anchor: new google.maps.Point(flightIcon.width / 2, flightIcon.height / 2),
    fillColor: color['google-blue 100'],
    fillOpacity: 1,
    path: flightIcon.path,
    rotation: currentDirection.current,
    scale: 2,
    strokeColor: color['white 100'],
    strokeWeight: 2,
  };
  marker = new google.maps.Marker({
    icon: svgIcon,
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
