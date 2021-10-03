import {useContext} from 'react';
// import PropTypes from 'prop-types';

import {NightModeContext} from 'src/context/NightModeContext';

import {Button} from 'src/elements/Button';
import SvgCloud from 'src/elements/SvgCloud';

const SavePlaceButton = () => {
  const nightMode = useContext(NightModeContext);
  return nightMode ? (
    <Button.Nighttime data-position="bottom-right" type="button">
      <SvgCloud icon="add" title="Save a place" />
    </Button.Nighttime>
  ) : (
    <Button.Daytime data-position="bottom-right" type="button">
      <SvgCloud icon="add" title="Save a place" />
    </Button.Daytime>
  );
};

// SavePlaceButton.propTypes = {
// };

export default SavePlaceButton;
