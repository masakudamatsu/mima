import PropTypes from 'prop-types';

import {Button} from 'src/elements/Button';
import {SvgCloud} from 'src/elements/SvgCloud';

import {buttonLabel} from 'src/utils/uiCopies';

export const SearchButton = ({setSearchBoxOpen}) => {
  return (
    <Button
      aria-label={buttonLabel.search}
      data-position="top-right"
      onClick={() => setSearchBoxOpen(true)}
      type="button"
    >
      <SvgCloud icon="search" />
    </Button>
  );
};

SearchButton.propTypes = {
  setSearchBoxOpen: PropTypes.func,
};
