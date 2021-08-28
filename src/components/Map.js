import {useState} from 'react';
import PropTypes from 'prop-types';

import MapDisplay from './MapDisplay';
import MapLocator from './MapLocator';

const Map = () => {
  const [mapObject, setMapObject] = useState(null);
  return (
    <>
      <MapLocator mapObject={mapObject} />
      <MapDisplay setMapObject={setMapObject} />
    </>
  );
};

Map.propTypes = {};

export default Map;
