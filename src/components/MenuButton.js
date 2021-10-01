import {useContext} from 'react';
// import PropTypes from 'prop-types';

import {NightModeContext} from 'src/context/NightModeContext';

import {ButtonTopLeft} from 'src/elements/Button';
import SvgCloud from 'src/elements/SvgCloud';

const MenuButton = () => {
  const nightMode = useContext(NightModeContext);
  return nightMode ? (
    <ButtonTopLeft.Nighttime type="button">
      <SvgCloud icon="menu" title="Show menu" />
    </ButtonTopLeft.Nighttime>
  ) : (
    <ButtonTopLeft.Daytime type="button">
      <SvgCloud icon="menu" title="Show menu" />
    </ButtonTopLeft.Daytime>
  );
};

// MenuButton.propTypes = {
// };

export default MenuButton;
