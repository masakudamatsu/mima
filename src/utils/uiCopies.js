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
  what: geolocationApiFails,
  why: `We couldn’t obtain your location data because you’ve chosen to keep it private.`,
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
export const geolocationTimedOut = {
  what: geolocationApiFails,
  why: `We couldn’t obtain your location data for more than 10 seconds.`,
  how: `Check if your device can detect your location, and try again.`,
  button: {
    primary: `Try again`,
    secondary: `Close`,
  },
};
