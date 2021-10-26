import {useContext} from 'react';
// import PropTypes from 'prop-types';

import {NightModeContext} from 'src/context/NightModeContext';

import {Button} from 'src/elements/Button';
import {SvgCloud} from 'src/elements/SvgCloud';

import {buttonLabel} from 'src/utils/uiCopies';

export const SearchButton = () => {
  const nightMode = useContext(NightModeContext);
  return (
    <Button data-darkmode={nightMode} data-position="top-right" type="button">
      <SvgCloud icon="search" title={buttonLabel.search} />
    </Button>
  );
};

// SearchButton.propTypes = {
// };
