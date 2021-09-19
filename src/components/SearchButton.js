// import PropTypes from 'prop-types';

import Button from 'src/elements/Button';
import SvgCloud from 'src/elements/SvgCloud';

const SearchButton = () => {
  return (
    <Button $topRight onClick={() => {}}>
      <SvgCloud icon="search" title="Search a place" />
    </Button>
  );
};

// SearchButton.propTypes = {
// };

export default SearchButton;
