import {useContext, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import ModalPopup from 'src/components/ModalPopup';

import {NightModeContext} from 'src/context/NightModeContext';

import {Button} from 'src/elements/Button';
import SvgCloud from 'src/elements/SvgCloud';

import {color} from 'src/utils/designtokens';
import {
  geolocationNotSupported,
  geolocationPermissionDenied,
  geolocationPositionUnavailable,
  locatorButtonLabel,
  userLocationMakerLabel,
} from 'src/utils/uiCopies';

const flightIcon = {
  // source: Material Icons Flight: https://fonts.google.com/icons?icon.query=flight
  height: 24,
  path: `
    M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z
  `,
  width: 24,
};

const LocatorButton = ({mapObject}) => {
  // UI states
  const nightMode = useContext(NightModeContext);
  const [status, setStatus] = useState('initial');
  // to track user location
  const userLocation = useRef(null);
  const userDirection = useRef(45); // to match the button label icon
  // to remove the previous location marker
  const marker = useRef(null);
  const accuracyCircle = useRef(null);

  // helper functions
  function obtainCurrentCoordinates(position) {
    return {lat: position.coords.latitude, lng: position.coords.longitude};
  }
  function removeUserLocation() {
    if (marker.current) {
      marker.current.setMap(null); // remove the previous current location marker from the map
    }
    if (accuracyCircle.current) {
      accuracyCircle.current.setMap(null); // remove the previous circle from the map
    }
  }
  function markUserLocation({
    userDirection,
    userLocation,
    mapObject,
    markerLabelText,
    svgIcon,
    accuracy,
  }) {
    removeUserLocation(); // otherwise, previous location ramains visible

    // prepare for drawing markers
    const google = window.google;

    // design the icon to mark the current location
    marker.current = new google.maps.Marker({
      icon: {
        fillColor: color['google-blue 100'],
        fillOpacity: 1,
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        strokeColor: color['white 100'],
        strokeWeight: 2,
      },
      position: userLocation.current,
      title: markerLabelText,
    });
    // Mark the current location
    marker.current.setMap(mapObject);

    // Draw the circle indicationg the 95% confidence interval of current position
    accuracyCircle.current = new google.maps.Circle({
      // source: lines 65-72 of https://github.com/ChadKillingsworth/geolocation-marker/releases/download/v2.0.5/geolocation-marker.js
      center: userLocation.current,
      fillColor: color['google-blue-dark 100'],
      fillOpacity: 0.4,
      radius: accuracy,
      strokeColor: color['google-blue-light 100'],
      strokeOpacity: 0.4,
      strokeWeight: 1,
      zIndex: 1,
    });
    accuracyCircle.current.setMap(mapObject);
  }
  function handleGeolocationError(error, setStatus) {
    if (error.code === 1) {
      setStatus('permissionDenied');
    } else if (error.code === 2) {
      setStatus('positionUnavailable');
    }
  }

  // event hanlders
  const trackUserLocation = () => {
    if (navigator.geolocation) {
      // Start blinking the button
      setStatus('loading');
      // First-run of extracting GPS info
      navigator.geolocation.getCurrentPosition(
        position => {
          userLocation.current = obtainCurrentCoordinates(position);
          markUserLocation({
            userDirection,
            userLocation,
            mapObject,
            markerLabelText: userLocationMakerLabel,
            svgIcon: flightIcon,
            accuracy: position.coords.accuracy,
          });
          // Move to the current location
          mapObject.setCenter(userLocation.current);
          // Stop blinking the button & Change the button label icon
          setStatus('watching');
        },
        error => {
          handleGeolocationError(error, setStatus);
        },
        {maximumAge: 1000},
      );
    } else {
      // Browser doesn't support Geolocation
      setStatus('geolocationNotSupported');
    }
  };

  const initializeUI = () => {
    setStatus('initial');
  };

  return (
    <>
      <Button
        data-darkmode={nightMode}
        data-position="bottom-right-second"
        data-loading={status === 'loading'}
        onClick={trackUserLocation}
        type="button"
      >
        <SvgCloud icon={'flightTakeoff'} title={locatorButtonLabel.default} />
      </Button>
      {status === 'permissionDenied' && (
        <ModalPopup setModalPopupHidden={initializeUI}>
          <h1>{geolocationPermissionDenied.what}</h1>
          <p>{geolocationPermissionDenied.why}</p>
          <p>{geolocationPermissionDenied.how}</p>
          <button onClick={initializeUI} type="button">
            {geolocationPermissionDenied.button}
          </button>
        </ModalPopup>
      )}
      {status === 'positionUnavailable' && (
        <ModalPopup setModalPopupHidden={initializeUI}>
          <h1>{geolocationPositionUnavailable.what}</h1>
          <p>{geolocationPositionUnavailable.why}</p>
          <p>{geolocationPositionUnavailable.how}</p>
          <button onClick={trackUserLocation} type="button">
            {geolocationPositionUnavailable.button.primary}
          </button>
          <button onClick={initializeUI} type="button">
            {geolocationPositionUnavailable.button.secondary}
          </button>{' '}
        </ModalPopup>
      )}
      {status === 'geolocationNotSupported' && (
        <ModalPopup setModalPopupHidden={initializeUI}>
          <h1>{geolocationNotSupported.what}</h1>
          <p>{geolocationNotSupported.why}</p>
          <p>{geolocationNotSupported.how}</p>
          <button onClick={initializeUI} type="button">
            {geolocationNotSupported.button}
          </button>
        </ModalPopup>
      )}
    </>
  );
};

LocatorButton.propTypes = {
  mapObject: PropTypes.object.isRequired,
};

export default LocatorButton;
