import {useContext} from 'react';
// import PropTypes from 'prop-types';

import {NightModeContext} from 'src/context/NightModeContext';

import {Button} from 'src/elements/Button';
import SvgCloud from 'src/elements/SvgCloud';

const MenuButton = () => {
  const nightMode = useContext(NightModeContext);
  return nightMode ? (
    <Button.Nighttime data-position="top-left" type="button">
      <SvgCloud icon="menu" title="Show menu" />
    </Button.Nighttime>
  ) : (
    <Button.Daytime data-position="top-left" type="button">
      <SvgCloud icon="menu" title="Show menu" />
    </Button.Daytime>
  );
};

// MenuButton.propTypes = {
// };

export default MenuButton;
