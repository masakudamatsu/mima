import {useContext, useEffect, useState} from 'react';
// import PropTypes from 'prop-types';
import {NightModeContext} from 'src/context/NightModeContext';

import {ModalPopup} from 'src/components/ModalPopup';
import {Button} from 'src/elements/Button';
import {ButtonSquare} from 'src/elements/ButtonSquare';
import {ListMenu} from 'src/elements/ListMenu';
import {SvgAdd} from 'src/elements/SvgAdd';
import {SvgCloud} from 'src/elements/SvgCloud';
import {SvgClose} from 'src/elements/SvgClose';
import {SvgFlightTakeoff} from 'src/elements/SvgFlightTakeoff';
import {SvgSearch} from 'src/elements/SvgSearch';

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
        <ListMenu data-darkmode={nightMode}>
          <li>
            <button>
              <SvgSearch aria-hidden="true" /> Search Place
            </button>
          </li>
          <li>
            <button>
              <SvgFlightTakeoff aria-hidden="true" /> Find Where You Are
            </button>
          </li>
          <li>
            <button data-testid="last-focusable-element">
              <SvgAdd aria-hidden="true" /> Save Place
            </button>
          </li>
        </ListMenu>
      </ModalPopup>
    </nav>
  );
};

// MenuButton.propTypes = {
// };
