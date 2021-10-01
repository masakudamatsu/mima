import {useContext} from 'react';
// import PropTypes from 'prop-types';

import {NightModeContext} from 'src/context/NightModeContext';

import {ButtonBottomRight} from 'src/elements/Button';
import SvgCloud from 'src/elements/SvgCloud';

const SavePlaceButton = () => {
  const nightMode = useContext(NightModeContext);
  return nightMode ? (
    <ButtonBottomRight.Nighttime type="button">
      <SvgCloud icon="add" title="Save a place" />
    </ButtonBottomRight.Nighttime>
  ) : (
    <ButtonBottomRight.Daytime type="button">
      <SvgCloud icon="add" title="Save a place" />
    </ButtonBottomRight.Daytime>
  );
};

// SavePlaceButton.propTypes = {
// };

export default SavePlaceButton;
