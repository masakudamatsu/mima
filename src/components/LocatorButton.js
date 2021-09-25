import {useContext} from 'react';
// import PropTypes from 'prop-types';

import {NightModeContext} from 'src/context/NightModeContext';

import Button from 'src/elements/Button';
import SvgCloud from 'src/elements/SvgCloud';

const LocatorButton = () => {
  const nightMode = useContext(NightModeContext);
  return (
    <Button $bottomRightSecond $nightMode={nightMode}>
      <SvgCloud icon="flightTakeoff" title="Show current location" />
    </Button>
  );
};

// LocatorButton.propTypes = {
// };

export default LocatorButton;
