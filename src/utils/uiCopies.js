export const userLocationMakerLabel = 'You are here!';

export const locatorButtonLabel = {
  default: 'Start tracking current location',
  activated: 'Show current location',
};

const geolocationApiFails = 'Unable to find where you are';
export const geolocationNotSupported = {
  what: geolocationApiFails,
  why: `We couldn’t obtain your location data from your browser.`,
  how: `Consider using other browsers such as Chrome, Firefox, Microsoft Edge, and Safari.`,
  button: `Got it`,
};
export const geolocationPermissionDenied = {
  what: `We're not allowed to find where you are`,
  why: `You’ve chosen to keep your location private, and we respect your privacy.`,
  how: `To see where you are on the map, enable location services with your OS/browser.`,
  button: `Got it`,
};
export const geolocationPositionUnavailable = {
  what: geolocationApiFails,
  why: `We couldn’t obtain your location data from your device.`,
  how: `Check if your device can detect your location, and try again.`,
  button: {
    primary: `Try again`,
    secondary: `Close`,
  },
};
