import {useContext} from 'react';
// import PropTypes from 'prop-types';

import {NightModeContext} from 'src/context/NightModeContext';

import {ButtonTopRight} from 'src/elements/Button';
import SvgCloud from 'src/elements/SvgCloud';

const SearchButton = () => {
  const nightMode = useContext(NightModeContext);
  return (
    <ButtonTopRight $nightMode={nightMode}>
      <SvgCloud icon="search" title="Search a place" />
    </ButtonTopRight>
  );
};

// SearchButton.propTypes = {
// };

export default SearchButton;
