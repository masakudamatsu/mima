import {useContext, useEffect, useRef, useState} from 'react';
// import PropTypes from 'prop-types';
import FocusLock from 'react-focus-lock';
import {NightModeContext} from 'src/context/NightModeContext';

import {ModalPopup} from 'src/components/ModalPopup';
import {Button} from 'src/elements/Button';
import {SvgCloud} from 'src/elements/SvgCloud';
import {ButtonSquare} from 'src/elements/ButtonSquare';
import {SvgClose} from 'src/elements/SvgClose';

import {buttonLabel, menuLabel} from 'src/utils/uiCopies';

export const MenuButton = () => {
  const nightMode = useContext(NightModeContext);
  const [open, setOpen] = useState(false);

  // focus management
  const closeButton = useRef();
  useEffect(() => {
    if (open) {
      closeButton.current.focus();
    }
  }, [open]);

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
      <FocusLock disabled={!open} returnFocus>
        <ModalPopup hidden={!open} slideFrom="left" titleId="menu-label">
          <h1 id="menu-label">{menuLabel}</h1>
          <ButtonSquare
            data-darkmode={nightMode}
            data-testid="close-button"
            onClick={handleClickCloseButton}
            ref={closeButton}
            type="button"
          >
            <SvgClose title={buttonLabel.close} />
          </ButtonSquare>
          <ul>
            <li>
              <button>First menu item</button>
            </li>
            <li>
              <button data-testid="last-focusable-element">
                Second menu item
              </button>
            </li>
          </ul>
        </ModalPopup>
      </FocusLock>
    </nav>
  );
};

// MenuButton.propTypes = {
// };
