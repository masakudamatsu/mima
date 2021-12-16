// import PropTypes from 'prop-types';

import {Button} from 'src/elements/Button';
import {SvgCloud} from 'src/elements/SvgCloud';

import {buttonLabel} from 'src/utils/uiCopies';

export const SearchButton = () => {
  return (
    <form role="search">
      <Button
        aria-label={buttonLabel.search}
        data-position="top-right"
        type="button"
      >
        <SvgCloud icon="search" />
      </Button>
    </form>
  );
};

// SearchButton.propTypes = {
// };
