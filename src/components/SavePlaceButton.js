// import PropTypes from 'prop-types';

import Button from 'src/elements/Button';
import SvgCloud from 'src/elements/SvgCloud';

const SavePlaceButton = () => {
  return (
    <Button $bottomRight onClick={() => {}}>
      <SvgCloud icon="add" title="Save a place" />
    </Button>
  );
};

// SavePlaceButton.propTypes = {
// };

export default SavePlaceButton;
