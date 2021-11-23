import PropTypes from 'prop-types';

import {ModalPopup} from 'src/components/ModalPopup';

import {Button} from 'src/elements/Button';
import {ButtonDialog} from 'src/elements/ButtonDialog';
import {DivErrorDialog} from 'src/elements/DivErrorDialog';
import {Heading} from 'src/elements/Heading';
import {SvgCloud} from 'src/elements/SvgCloud';

import {
  buttonLabel,
  geolocationNotSupported,
  geolocationPermissionDenied,
  geolocationPositionUnavailable,
} from 'src/utils/uiCopies';

export const LocatorButton = ({
  initializeUI,
  moveToCurrentLocation,
  status,
  trackUserLocation,
}) => {
  return (
    <>
      {status !== 'watching' ? (
        <Button
          data-loading={status === 'loading'}
          data-position="bottom-right-second"
          data-testid="locator-button"
          onClick={trackUserLocation}
          type="button"
        >
          <SvgCloud
            icon={'flightTakeoff'}
            title={buttonLabel.locator.default}
          />
        </Button>
      ) : (
        <Button
          data-position="bottom-right-second"
          onClick={moveToCurrentLocation}
          type="button"
        >
          <SvgCloud
            icon={'flightFlying'}
            title={buttonLabel.locator.activated}
          />
        </Button>
      )}
      <ModalPopup
        alert
        hidden={status !== 'permissionDenied'}
        slideFrom="bottom"
        titleId="permission-denied"
      >
        <DivErrorDialog>
          <Heading as="h1" id="permission-denied">
            {geolocationPermissionDenied.what}
          </Heading>
          <p>{geolocationPermissionDenied.why}</p>
          <p>{geolocationPermissionDenied.how}</p>
          <ButtonDialog
            data-autofocus
            data-testid="close-button-denied"
            onClick={initializeUI}
            type="button"
          >
            {geolocationPermissionDenied.button}
          </ButtonDialog>
        </DivErrorDialog>
      </ModalPopup>
      <ModalPopup
        alert
        hidden={status !== 'positionUnavailable'}
        slideFrom="bottom"
        titleId="position-unavailable"
      >
        <DivErrorDialog>
          <Heading as="h1" id="position-unavailable">
            {geolocationPositionUnavailable.what}
          </Heading>
          <p>{geolocationPositionUnavailable.why}</p>
          <p>{geolocationPositionUnavailable.how}</p>
          <ButtonDialog onClick={trackUserLocation} type="button">
            {geolocationPositionUnavailable.button.primary}
          </ButtonDialog>
          <ButtonDialog
            data-autofocus
            data-testid="close-button-unavailable"
            onClick={initializeUI}
            type="button"
          >
            {geolocationPositionUnavailable.button.secondary}
          </ButtonDialog>{' '}
        </DivErrorDialog>
      </ModalPopup>
      <ModalPopup
        alert
        hidden={status !== 'geolocationNotSupported'}
        slideFrom="bottom"
        titleId="geolocation-unsupported"
      >
        <DivErrorDialog>
          <Heading as="h1" id="geolocation-unsupported">
            {geolocationNotSupported.what}
          </Heading>
          <p>{geolocationNotSupported.why}</p>
          <p>{geolocationNotSupported.how}</p>
          <ButtonDialog
            data-autofocus
            data-testid="close-button-unsupported"
            onClick={initializeUI}
            type="button"
          >
            {geolocationNotSupported.button}
          </ButtonDialog>
        </DivErrorDialog>
      </ModalPopup>
    </>
  );
};

LocatorButton.propTypes = {
  initializeUI: PropTypes.func,
  moveToCurrentLocation: PropTypes.func,
  status: PropTypes.string,
  trackUserLocation: PropTypes.func,
};
