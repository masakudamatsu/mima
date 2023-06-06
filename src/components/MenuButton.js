import {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useUser} from '@auth0/nextjs-auth0';
import FocusLock from 'react-focus-lock';

import {useOnClickOutside} from 'src/hooks/useOnClickOutside';
import {useOnEscKeyDown} from 'src/hooks/useOnEscKeyDown';

import {CloseButton} from './CloseButton';
import {Logo} from './Logo';

import {Button} from 'src/elements/Button';
import {DivMenuBackground} from 'src/elements/DivMenuBackground';
import {ListMenu} from 'src/elements/ListMenu';
import {ParagraphMenu} from 'src/elements/ParagraphMenu';
import {SpanRipple} from 'src/elements/SpanRipple';
// TODO #465: Put back the save place button
// import {SvgAdd} from 'src/elements/SvgAdd';
import {SvgCloud} from 'src/elements/SvgCloud';
import {SvgCreditCard} from 'src/elements/SvgCreditCard';
import {SvgDeleteForever} from 'src/elements/SvgDeleteForever';
import {SvgFlightLanding} from 'src/elements/SvgFlightLanding';
import {SvgFlightFlying} from 'src/elements/SvgFlightFlying';
import {SvgFlightTakeoff} from 'src/elements/SvgFlightTakeoff';
import {SvgLogout} from 'src/elements/SvgLogout';
import {SvgRefresh} from 'src/elements/SvgRefresh';
import {SvgSearch} from 'src/elements/SvgSearch';
import {VisuallyHidden} from 'src/elements/VisuallyHidden';

import {buttonLabel, menuLabel} from 'src/utils/uiCopies';
import {statusType} from 'src/utils/type';

export const MenuButton = ({
  moveToCurrentLocation,
  stopTracking,
  trackUserLocation,
  userStatus,
  watchID,
}) => {
  const [ui, setUi] = useState({
    button: 'open',
    menu: 'closed',
  });

  const openMenu = () => {
    setUi({
      button: 'closing',
      menu: 'opening',
    });
  };

  const closeMenu = () => {
    closeButtonPressed.current = false;
    setUi({
      button: 'opening',
      menu: 'closing',
    });
  };
  const handleClickCloseButton = ({
    rippleDiameter,
    ripplePositionLeft,
    ripplePositionTop,
  } = {}) => {
    closeButtonPressed.current = true;
    setUi({
      button: 'opening',
      menu: 'closing',
      rippleDiameter,
      ripplePositionLeft,
      ripplePositionTop,
    });
  };

  // Remove from DOM after transition animation is over
  const handleAnimationEnd = () => {
    if (ui.button === 'closing') {
      setUi({
        button: 'closed',
        menu: 'open',
      });
    }
    if (ui.menu === 'closing') {
      setUi({
        button: 'open',
        menu: 'closed',
      });
    }
  };

  useOnEscKeyDown({state: ui.menu === 'open', handler: handleClickCloseButton});

  // close by clicking outside
  const menu = useRef(null);
  useOnClickOutside(menu, handleClickCloseButton);

  // Focus the menu button after closing the menu
  const buttonElement = useRef();
  const closeButtonPressed = useRef(false);
  useEffect(() => {
    if (ui.menu === 'closed') {
      if (closeButtonPressed.current === true) {
        buttonElement.current.focus();
      }
    }
  }, [ui.menu]);

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
    <nav onAnimationEnd={handleAnimationEnd}>
      {ui.button !== 'closed' ? (
        <Button
          aria-label={buttonLabel.menu}
          data-closing={ui.button === 'closing'}
          data-position="top-left"
          data-testid="menu-button"
          onClick={openMenu}
          ref={buttonElement}
          type="button"
        >
          <SvgCloud icon="menu" />
        </Button>
      ) : null}
      {ui.menu !== 'closed' ? (
        <FocusLock>
          <DivMenuBackground.Wrapper data-closing={ui.menu === 'closing'}>
            <DivMenuBackground
              data-closing={ui.menu === 'closing'}
              role="dialog"
              aria-labelledby="menu-label"
              ref={menu}
            >
              <Logo />
              <VisuallyHidden as="h2" id="menu-label">
                {menuLabel}
              </VisuallyHidden>
              <CloseButton
                ariaLabel={buttonLabel.close}
                handleClick={handleClickCloseButton}
                testId="close-button-menu"
              />
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
                {/* TODO #368: Open the search box from the menu
                <li>
                  <button>
                    <SvgSearch aria-hidden="true" /> {buttonLabel.search}
                  </button>
                </li> */}
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
                {/* 
                  // TODO #465: Put back the save place button
                  <li>
                    <button>
                      <SvgAdd aria-hidden="true" /> {buttonLabel.save}
                    </button>
                  </li> 
                */}
                <li>
                  <a
                    href={
                      userStatus === statusType.trial
                        ? false
                        : process.env.NEXT_PUBLIC_CUSTOMER_PORTAL_URL
                    }
                  >
                    <SvgCreditCard aria-hidden="true" />
                    {buttonLabel.customerPortal.update}
                  </a>
                </li>
                <li>
                  <a
                    data-testid="last-focusable-element" // to be used in menu.cy.js for testing focus trap
                    href={
                      userStatus === statusType.trial
                        ? false
                        : process.env.NEXT_PUBLIC_CUSTOMER_PORTAL_URL
                    }
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
            </DivMenuBackground>
            {ui.menu === 'closing' ? (
              <SpanRipple
                id="ripple"
                style={{
                  height: ui.rippleDiameter,
                  left: ui.ripplePositionLeft,
                  top: ui.ripplePositionTop,
                  width: ui.rippleDiameter,
                }}
              />
            ) : null}
          </DivMenuBackground.Wrapper>
        </FocusLock>
      ) : null}
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
