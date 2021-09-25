import {useContext} from 'react';
// import PropTypes from 'prop-types';

import {NightModeContext} from 'src/context/NightModeContext';

import Button from 'src/elements/Button';
import SvgCloud from 'src/elements/SvgCloud';

const MenuButton = () => {
  const nightMode = useContext(NightModeContext);
  return (
    <Button $topLeft $nightMode={nightMode} onClick={() => {}}>
      <SvgCloud icon="menu" title="Show menu" />
    </Button>
  );
};

// MenuButton.propTypes = {
// };

export default MenuButton;
