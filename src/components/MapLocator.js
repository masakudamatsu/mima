import {useState} from 'react';
import PropTypes from 'prop-types';

import Button from 'src/elements/Button';
import {minTargetSize} from 'src/utils/styleShape';

const MapLocator = ({mapObject}) => {
  const [loading, setLoading] = useState(false);

  const getCurrentPosition = () => {
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

  return (
    <Button onClick={getCurrentPosition} $loading={loading}>
      <svg
        role="img"
        aria-labelledby="icon-locator"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height={`${minTargetSize}px`}
        width={`${minTargetSize}px`}
      >
        <title id="icon-locator">Show current location</title>
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
      </svg>
    </Button>
  );
};

MapLocator.propTypes = {
  mapObject: PropTypes.object,
};

export default MapLocator;
