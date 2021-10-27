import {useContext, useState} from 'react';
// import PropTypes from 'prop-types';

import {NightModeContext} from 'src/context/NightModeContext';

import {ModalPopup} from 'src/components/ModalPopup';
import {Button} from 'src/elements/Button';
import {SvgCloud} from 'src/elements/SvgCloud';

import {buttonLabel, menuLabel} from 'src/utils/uiCopies';

export const MenuButton = () => {
  const nightMode = useContext(NightModeContext);
  const [open, setOpen] = useState(false);
  const closeByEsc = event => {
    if (event.key === 'Escape') {
      document.removeEventListener('keydown', closeByEsc);
      setOpen(false);
    }
  };
  const handleClick = () => {
    document.addEventListener('keydown', closeByEsc);
    setOpen(true);
  };
  const handleClickCloseButton = () => {
    document.removeEventListener('keydown', closeByEsc);
    setOpen(false);
  };
  return (
    <nav>
      <Button
        data-darkmode={nightMode}
        data-position="top-left"
        onClick={handleClick}
        type="button"
      >
        <SvgCloud icon="menu" title={buttonLabel.menu} />
      </Button>
      <ModalPopup
        handleClickCloseButton={handleClickCloseButton}
        hidden={!open}
        slideFrom="left"
        titleId="menu-label"
      >
        <h1 id="menu-label">{menuLabel}</h1>
      </ModalPopup>
    </nav>
  );
};

// MenuButton.propTypes = {
// };
