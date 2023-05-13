import PropTypes from 'prop-types';

import {ModalPopup} from 'src/components/ModalPopup';

import {Button} from 'src/elements/Button';
import {ButtonDialog} from 'src/elements/ButtonDialog';
import {H2} from 'src/elements/H2';
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
          aria-label={buttonLabel.locator.default}
          data-loading={status === 'loading'}
          data-position="bottom-right-second"
          data-testid="locator-button"
          onClick={trackUserLocation}
          type="button"
        >
          <SvgCloud icon={'flightTakeoff'} />
        </Button>
      ) : (
        <Button
          aria-label={buttonLabel.locator.activated}
          data-position="bottom-right-second"
          onClick={moveToCurrentLocation}
          type="button"
        >
          <SvgCloud icon={'flightFlying'} />
        </Button>
      )}
      <ModalPopup
        alert
        hidden={status !== 'permissionDenied'}
        slideFrom="bottom"
        titleId="permission-denied"
      >
        <H2 as="h1" id="permission-denied">
          {geolocationPermissionDenied.what}
        </H2>
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
      </ModalPopup>
      <ModalPopup
        alert
        hidden={status !== 'positionUnavailable'}
        slideFrom="bottom"
        titleId="position-unavailable"
      >
        <H2 as="h1" id="position-unavailable">
          {geolocationPositionUnavailable.what}
        </H2>
        <p>{geolocationPositionUnavailable.why}</p>
        <p>{geolocationPositionUnavailable.how}</p>
        <ButtonDialog
          data-testid="primary-button-unavailable"
          onClick={trackUserLocation}
          type="button"
        >
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
      </ModalPopup>
      <ModalPopup
        alert
        hidden={status !== 'geolocationNotSupported'}
        slideFrom="bottom"
        titleId="geolocation-unsupported"
      >
        <H2 as="h1" id="geolocation-unsupported">
          {geolocationNotSupported.what}
        </H2>
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
