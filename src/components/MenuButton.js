// import PropTypes from 'prop-types';

import Button from 'src/elements/Button';
import SvgCloud from 'src/elements/SvgCloud';

const MenuButton = () => {
  return (
    <Button $topLeft onClick={() => {}}>
      <SvgCloud icon="menu" title="Show menu" />
    </Button>
  );
};

// MenuButton.propTypes = {
// };

export default MenuButton;
