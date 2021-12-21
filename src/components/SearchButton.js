import PropTypes from 'prop-types';

import {Button} from 'src/elements/Button';
import {SvgCloud} from 'src/elements/SvgCloud';

import {buttonLabel} from 'src/utils/uiCopies';

export const SearchButton = ({handleClick, importSearchBox}) => {
  return (
    <Button
      aria-label={buttonLabel.search}
      data-position="top-right"
      data-testid="search-button"
      onClick={handleClick}
      onFocus={importSearchBox}
      onMouseEnter={importSearchBox}
      type="button"
    >
      <SvgCloud icon="search" />
    </Button>
  );
};

SearchButton.propTypes = {
  handleClick: PropTypes.func,
  importSearchBox: PropTypes.func,
};
