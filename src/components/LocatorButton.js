import {useContext} from 'react';
// import PropTypes from 'prop-types';

import {NightModeContext} from 'src/context/NightModeContext';

import {ButtonBottomRightSecond} from 'src/elements/Button';
import SvgCloud from 'src/elements/SvgCloud';

const LocatorButton = () => {
  const nightMode = useContext(NightModeContext);
  return nightMode ? (
    <ButtonBottomRightSecond.Nighttime type="button">
      <SvgCloud icon="flightTakeoff" title="Show current location" />
    </ButtonBottomRightSecond.Nighttime>
  ) : (
    <ButtonBottomRightSecond.Daytime type="button">
      <SvgCloud icon="flightTakeoff" title="Show current location" />
    </ButtonBottomRightSecond.Daytime>
  );
};

// LocatorButton.propTypes = {
// };

export default LocatorButton;
