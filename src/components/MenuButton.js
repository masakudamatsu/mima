import {useContext, useEffect, useState} from 'react';
// import PropTypes from 'prop-types';
import {NightModeContext} from 'src/context/NightModeContext';

import {ModalPopup} from 'src/components/ModalPopup';
import {Button} from 'src/elements/Button';
import {SvgCloud} from 'src/elements/SvgCloud';
import {ButtonSquare} from 'src/elements/ButtonSquare';
import {SvgClose} from 'src/elements/SvgClose';
import {ListMenu} from 'src/elements/ListMenu';

import {buttonLabel, menuLabel} from 'src/utils/uiCopies';

export const MenuButton = () => {
  const nightMode = useContext(NightModeContext);
  const [open, setOpen] = useState(false);

  // close menu with Esc key
  useEffect(() => {
    const closeByEsc = event => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('keydown', closeByEsc);
    } else {
      document.removeEventListener('keydown', closeByEsc);
    }
    return () => {
      document.removeEventListener('keydown', closeByEsc);
    }; // otherwise Jest/Testing-Library issues a warning
  }, [open]);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClickCloseButton = () => {
    setOpen(false);
  };
  return (
    <nav>
      <Button
        data-darkmode={nightMode}
        data-position="top-left"
        data-testid="menu-button"
        onClick={handleClick}
        type="button"
      >
        <SvgCloud icon="menu" title={buttonLabel.menu} />
      </Button>
      <ModalPopup hidden={!open} slideFrom="left" titleId="menu-label">
        <h1 id="menu-label">{menuLabel}</h1>
        <ButtonSquare
          data-autofocus
          data-darkmode={nightMode}
          data-testid="close-button-menu"
          onClick={handleClickCloseButton}
          type="button"
        >
          <SvgClose title={buttonLabel.close} />
        </ButtonSquare>
        <ListMenu>
          <li>
            <button>First menu item</button>
          </li>
          <li>
            <button data-testid="last-focusable-element">
              Second menu item
            </button>
          </li>
        </ListMenu>
      </ModalPopup>
    </nav>
  );
};

// MenuButton.propTypes = {
// };
