import {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useUser} from '@auth0/nextjs-auth0';
import FocusLock from 'react-focus-lock';

import {useOnEscKeyDown} from 'src/hooks/useOnEscKeyDown';

import {Button} from 'src/elements/Button';
import {ButtonCircle} from 'src/elements/ButtonCircle';
import {DivScrim} from 'src/elements/DivScrim';
import {DivPopup} from 'src/elements/DivPopup';
import {Heading} from 'src/elements/Heading';
import {ListMenu} from 'src/elements/ListMenu';
import {ParagraphMenu} from 'src/elements/ParagraphMenu';
import {SvgAdd} from 'src/elements/SvgAdd';
import {SvgCloud} from 'src/elements/SvgCloud';
import {SvgClose} from 'src/elements/SvgClose';
import {SvgCreditCard} from 'src/elements/SvgCreditCard';
import {SvgDeleteForever} from 'src/elements/SvgDeleteForever';
import {SvgFlightLanding} from 'src/elements/SvgFlightLanding';
import {SvgFlightFlying} from 'src/elements/SvgFlightFlying';
import {SvgFlightTakeoff} from 'src/elements/SvgFlightTakeoff';
import {SvgLogout} from 'src/elements/SvgLogout';
import {SvgRefresh} from 'src/elements/SvgRefresh';
import {SvgSearch} from 'src/elements/SvgSearch';

import {buttonLabel, menuLabel} from 'src/utils/uiCopies';
import {statusType} from 'src/utils/type';

export const MenuButton = ({
  moveToCurrentLocation,
  stopTracking,
  trackUserLocation,
  userStatus,
  watchID,
}) => {
  const [menu, setMenu] = useState('closed');
  const closeMenu = () => {
    setMenu('closed');
  };

  useOnEscKeyDown({state: menu === 'open', handler: closeMenu});

  // Focus the menu button after closing the menu
  const buttonElement = useRef();
  useEffect(() => {
    if (menu === 'closed') {
      buttonElement.current.focus();
    }
  }, [menu]);

  const handleClick = () => {
    setMenu('open');
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

  // show user info
  const {user, error, isLoading} = useUser();

  return (
    <nav>
      {menu === 'closed' ? (
        <Button
          aria-label={buttonLabel.menu}
          data-position="top-left"
          data-testid="menu-button"
          onClick={handleClick}
          ref={buttonElement}
          type="button"
        >
          <SvgCloud icon="menu" />
        </Button>
      ) : (
        <FocusLock>
          <DivScrim />
          <DivPopup
            data-hidden={menu === 'closed'}
            data-slide-from="left"
            role="dialog"
            aria-labelledby="menu-label"
          >
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
            <ParagraphMenu>
              {isLoading
                ? 'Loading...'
                : error || !user
                ? 'Failed to fetch your user info'
                : `Logged in with ${user.email}`}
            </ParagraphMenu>
            <ListMenu>
              <li>
                <a href="/api/auth/logout">
                  <SvgLogout aria-hidden="true" /> {buttonLabel.logout}
                </a>
              </li>
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
                <button>
                  <SvgAdd aria-hidden="true" /> {buttonLabel.save}
                </button>
              </li>
              <li>
                <a href={process.env.NEXT_PUBLIC_CUSTOMER_PORTAL_URL}>
                  <SvgCreditCard aria-hidden="true" />
                  {buttonLabel.customerPortal.update}
                </a>
              </li>
              <li>
                <a
                  data-testid="last-focusable-element" // to be used in menu.cy.js for testing focus trap
                  href={process.env.NEXT_PUBLIC_CUSTOMER_PORTAL_URL}
                >
                  {userStatus === statusType.cancelled ? (
                    <SvgRefresh aria-hidden="true" />
                  ) : (
                    <SvgDeleteForever aria-hidden="true" />
                  )}
                  {userStatus === statusType.cancelled
                    ? buttonLabel.customerPortal.reactivate
                    : buttonLabel.customerPortal.cancel}
                </a>
              </li>
            </ListMenu>
          </DivPopup>
        </FocusLock>
      )}
    </nav>
  );
};

MenuButton.propTypes = {
  moveToCurrentLocation: PropTypes.func,
  stopTracking: PropTypes.func,
  trackUserLocation: PropTypes.func,
  userStatus: PropTypes.oneOf(Object.values(statusType)),
  watchID: PropTypes.number,
};
