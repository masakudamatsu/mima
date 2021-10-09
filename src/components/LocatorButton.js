import {useContext, useState} from 'react';
import PropTypes from 'prop-types';

import {NightModeContext} from 'src/context/NightModeContext';

import {Button} from 'src/elements/Button';
import SvgCloud from 'src/elements/SvgCloud';
import {color} from 'src/utils/designtokens';

const airplane = {
  height: 24,
  path: `
    M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z
  `,
  width: 24,
}; // source: Material Icons Flight: https://fonts.google.com/icons?icon.query=flight

const icon = airplane;
let marker = null;
// this needs to be outside the component
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
        // obtain the direction
        let heading = position.coords.heading; // 0 degrees represents true north, and the direction is determined clockwise (which means that east is 90 degrees and west is 270 degrees). If speed is 0, heading is NaN. If the device is unable to provide heading information, this value is null.  https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates/heading
        if (!heading) {
          heading = 0;
        }
        // remove the previous current location marker from the map
        if (marker) {
          marker.setMap(null);
        }
        // create the current location marker
        const google = window.google;
        const svgImg = ({nightMode, rotation}) => {
          return {
            anchor: new google.maps.Point(icon.width / 2, icon.height / 2), // to pin the icon at its center, rather than at its top-left (default)
            fillColor: nightMode ? color['mid-grey 100'] : color['white 100'],
            fillOpacity: 1,
            path: icon.path,
            rotation: rotation,
            scale: 2,
            strokeColor: nightMode
              ? color['off-black 100']
              : color['day-mid-grey 100'],
            strokeOpacity: 1,
          };
        };
        marker = new google.maps.Marker({
          icon: svgImg({nightMode: nightMode, rotation: heading}),
          position: pos,
          title: 'You are here!',
        });
        console.log(marker);
        marker.setMap(mapObject);

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
