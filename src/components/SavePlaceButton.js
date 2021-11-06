// import PropTypes from 'prop-types';

import {Button} from 'src/elements/Button';
import {SvgCloud} from 'src/elements/SvgCloud';

import {buttonLabel} from 'src/utils/uiCopies';

export const SavePlaceButton = () => {
  return (
    <Button data-position="bottom-right" type="button">
      <SvgCloud icon="add" title={buttonLabel.save} />
    </Button>
  );
};

// SavePlaceButton.propTypes = {
// };
