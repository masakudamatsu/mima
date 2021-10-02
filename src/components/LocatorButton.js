import {useContext, useState} from 'react';
import PropTypes from 'prop-types';

import {NightModeContext} from 'src/context/NightModeContext';

import {Button} from 'src/elements/Button';
import SvgCloud from 'src/elements/SvgCloud';

const LocatorButton = ({mapObject}) => {
  const [loading, setLoading] = useState(false);
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(async position => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        await mapObject.setCenter(pos);
        setLoading(false);
      });
    } else {
      // Browser doesn't support Geolocation
    }
  };
  const nightMode = useContext(NightModeContext);
  return (
    <Button
      data-darkmode={nightMode}
      data-position="bottom-right-second"
      $loading={loading}
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
