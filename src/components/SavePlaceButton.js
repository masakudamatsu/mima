import {useContext} from 'react';
// import PropTypes from 'prop-types';

import {NightModeContext} from 'src/context/NightModeContext';

import Button from 'src/elements/Button';
import SvgCloud from 'src/elements/SvgCloud';

const SavePlaceButton = () => {
  const nightMode = useContext(NightModeContext);
  return (
    <Button $bottomRight $nightMode={nightMode} onClick={() => {}}>
      <SvgCloud icon="add" title="Save a place" />
    </Button>
  );
};

// SavePlaceButton.propTypes = {
// };

export default SavePlaceButton;
