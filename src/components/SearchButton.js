import {useContext} from 'react';
// import PropTypes from 'prop-types';

import {NightModeContext} from 'src/context/NightModeContext';

import {ButtonTopRight} from 'src/elements/Button';
import SvgCloud from 'src/elements/SvgCloud';

const SearchButton = () => {
  const nightMode = useContext(NightModeContext);
  return nightMode ? (
    <ButtonTopRight.Nighttime type="button">
      <SvgCloud icon="search" title="Search a place" />
    </ButtonTopRight.Nighttime>
  ) : (
    <ButtonTopRight.Daytime type="button">
      <SvgCloud icon="search" title="Search a place" />
    </ButtonTopRight.Daytime>
  );
};

// SearchButton.propTypes = {
// };

export default SearchButton;
