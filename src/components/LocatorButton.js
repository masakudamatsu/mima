import {useContext} from 'react';
// import PropTypes from 'prop-types';

import {NightModeContext} from 'src/context/NightModeContext';

import {ButtonBottomRightSecond} from 'src/elements/Button';
import SvgCloud from 'src/elements/SvgCloud';

const LocatorButton = () => {
  const nightMode = useContext(NightModeContext);
  return (
    <ButtonBottomRightSecond $nightMode={nightMode}>
      <SvgCloud icon="flightTakeoff" title="Show current location" />
    </ButtonBottomRightSecond>
  );
};

// LocatorButton.propTypes = {
// };

export default LocatorButton;
