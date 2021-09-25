import {useContext} from 'react';
// import PropTypes from 'prop-types';

import {NightModeContext} from 'src/context/NightModeContext';

import Button from 'src/elements/Button';
import SvgCloud from 'src/elements/SvgCloud';

const SearchButton = () => {
  const nightMode = useContext(NightModeContext);
  return (
    <Button $topRight $nightMode={nightMode} onClick={() => {}}>
      <SvgCloud icon="search" title="Search a place" />
    </Button>
  );
};

// SearchButton.propTypes = {
// };

export default SearchButton;
