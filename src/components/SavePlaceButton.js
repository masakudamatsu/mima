import {useContext} from 'react';
// import PropTypes from 'prop-types';

import {NightModeContext} from 'src/context/NightModeContext';

import {ButtonBottomRight} from 'src/elements/Button';
import SvgCloud from 'src/elements/SvgCloud';

const SavePlaceButton = () => {
  const nightMode = useContext(NightModeContext);
  return (
    <ButtonBottomRight $nightMode={nightMode}>
      <SvgCloud icon="add" title="Save a place" />
    </ButtonBottomRight>
  );
};

// SavePlaceButton.propTypes = {
// };

export default SavePlaceButton;
