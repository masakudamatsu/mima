// import PropTypes from 'prop-types';

import {Button} from 'src/elements/Button';
import {SvgCloud} from 'src/elements/SvgCloud';

import {buttonLabel} from 'src/utils/uiCopies';

export const SearchButton = () => {
  return (
    <form role="search">
      <Button data-position="top-right" type="button">
        <SvgCloud icon="search" title={buttonLabel.search} />
      </Button>
    </form>
  );
};

// SearchButton.propTypes = {
// };
