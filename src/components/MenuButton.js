import {useState} from 'react';
import PropTypes from 'prop-types';

import {useOnEscKeyDown} from 'src/hooks/useOnEscKeyDown';
import {ModalPopup} from 'src/components/ModalPopup';
import {Button} from 'src/elements/Button';
import {ButtonCircle} from 'src/elements/ButtonCircle';
import {Heading} from 'src/elements/Heading';
import {ListMenu} from 'src/elements/ListMenu';
import {SvgAdd} from 'src/elements/SvgAdd';
import {SvgCloud} from 'src/elements/SvgCloud';
import {SvgClose} from 'src/elements/SvgClose';
import {SvgFlightLanding} from 'src/elements/SvgFlightLanding';
import {SvgFlightFlying} from 'src/elements/SvgFlightFlying';
import {SvgFlightTakeoff} from 'src/elements/SvgFlightTakeoff';
import {SvgSearch} from 'src/elements/SvgSearch';

import {buttonLabel, menuLabel} from 'src/utils/uiCopies';

export const MenuButton = ({
  moveToCurrentLocation,
  stopTracking,
  trackUserLocation,
  watchID,
}) => {
  const [open, setOpen] = useState(false);
  const closeMenu = () => {
    setOpen(false);
  };

  useOnEscKeyDown({state: open, handler: closeMenu});

  const handleClick = () => {
    setOpen(true);
  };
  const handleClickCloseButton = () => {
    closeMenu();
  };
  const handleClickFlightTakeoff = () => {
    trackUserLocation();
    closeMenu();
  };
  const handleClickFlightFlying = () => {
    moveToCurrentLocation();
    closeMenu();
  };
  const handleClickFlightLanding = () => {
    stopTracking(watchID);
    closeMenu();
  };
  return (
    <nav>
      <Button
        aria-label={buttonLabel.menu}
        data-position="top-left"
        data-testid="menu-button"
        onClick={handleClick}
        type="button"
      >
        <SvgCloud icon="menu" />
      </Button>
      <ModalPopup hidden={!open} slideFrom="left" titleId="menu-label">
        <Heading as="h2" id="menu-label">
          {menuLabel}
        </Heading>
        <ButtonCircle
          data-autofocus
          data-testid="close-button-menu"
          onClick={handleClickCloseButton}
          type="button"
        >
          <SvgClose title={buttonLabel.close} />
        </ButtonCircle>
        <ListMenu>
          <li>
            <button>
              <SvgSearch aria-hidden="true" /> {buttonLabel.search}
            </button>
          </li>
          <li>
            {!watchID ? (
              <button type="button" onClick={handleClickFlightTakeoff}>
                <SvgFlightTakeoff aria-hidden="true" />{' '}
                {buttonLabel.locator.default}
              </button>
            ) : (
              <button type="button" onClick={handleClickFlightFlying}>
                <SvgFlightFlying aria-hidden="true" />
                {buttonLabel.locator.activated}
              </button>
            )}
          </li>
          <li>
            <button
              type="button"
              disabled={!watchID}
              onClick={handleClickFlightLanding}
            >
              <SvgFlightLanding aria-hidden="true" />{' '}
              {buttonLabel.locator.deactivate}
            </button>
          </li>
          <li>
            <button data-testid="last-focusable-element">
              <SvgAdd aria-hidden="true" /> {buttonLabel.save}
            </button>
          </li>
        </ListMenu>
      </ModalPopup>
    </nav>
  );
};

MenuButton.propTypes = {
  moveToCurrentLocation: PropTypes.func,
  stopTracking: PropTypes.func,
  trackUserLocation: PropTypes.func,
  watchID: PropTypes.number,
};
