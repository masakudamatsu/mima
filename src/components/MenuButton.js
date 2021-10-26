import {useContext} from 'react';
// import PropTypes from 'prop-types';

import {NightModeContext} from 'src/context/NightModeContext';

import {Button} from 'src/elements/Button';
import {SvgCloud} from 'src/elements/SvgCloud';

export const MenuButton = () => {
  const nightMode = useContext(NightModeContext);
  return (
    <Button data-darkmode={nightMode} data-position="top-left" type="button">
      <SvgCloud icon="menu" title="Show menu" />
    </Button>
  );
};

// MenuButton.propTypes = {
// };
