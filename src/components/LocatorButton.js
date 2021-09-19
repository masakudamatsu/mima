// import PropTypes from 'prop-types';

import Button from 'src/elements/Button';
import SvgCloud from 'src/elements/SvgCloud';

const LocatorButton = () => {
  return (
    <Button $bottomRightSecond onClick={() => {}}>
      <SvgCloud icon="flightTakeoff" title="Show current location" />
    </Button>
  );
};

// LocatorButton.propTypes = {
// };

export default LocatorButton;
