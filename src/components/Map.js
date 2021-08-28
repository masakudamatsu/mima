import {useState} from 'react';
import PropTypes from 'prop-types';

import MapDisplay from './MapDisplay';
import MapLocator from './MapLocator';

const Map = ({nightMode}) => {
  const [mapObject, setMapObject] = useState(null);
  return (
    <>
      <MapLocator mapObject={mapObject} />
      <MapDisplay nightMode={nightMode} setMapObject={setMapObject} />
    </>
  );
};

Map.propTypes = {
  nightMode: PropTypes.bool,
};

export default Map;
