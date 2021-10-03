import {useContext} from 'react';
// import PropTypes from 'prop-types';

import {NightModeContext} from 'src/context/NightModeContext';

import {Button} from 'src/elements/Button';
import SvgCloud from 'src/elements/SvgCloud';

const LocatorButton = () => {
  const nightMode = useContext(NightModeContext);
  return nightMode ? (
    <Button.Nighttime data-position="bottom-right-second" type="button">
      <SvgCloud icon="flightTakeoff" title="Show current location" />
    </Button.Nighttime>
  ) : (
    <Button.Daytime data-position="bottom-right-second" type="button">
      <SvgCloud icon="flightTakeoff" title="Show current location" />
    </Button.Daytime>
  );
};

// LocatorButton.propTypes = {
// };

export default LocatorButton;
