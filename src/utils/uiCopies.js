export const userLocationMakerLabel = 'You are here!';

export const buttonLabel = {
  close: 'Close',
  locator: {
    default: 'Start tracking current location',
    activated: 'Show current location',
  },
  menu: 'Show menu',
  save: 'Save a place',
  search: 'Search a place',
};

export const menuLabel = 'Menu';

export const geolocationNotSupported = {
  what: `Unable to get location data from your browser`,
  why: `Your browser cannot handle location data in your device.`,
  how: `Consider using other browsers such as Chrome, Firefox, Microsoft Edge, and Safari.`,
  button: `Got it`,
};
export const geolocationPermissionDenied = {
  what: `Not allowed to find where you are`,
  why: `You’ve chosen to keep your location private, and we respect your privacy.`,
  how: `To see where you are on the map, enable location services with your OS/browser.`,
  button: `Got it`,
};
export const geolocationPositionUnavailable = {
  what: `Unable to get location data from your device`,
  why: `Your device has an issue with location data.`,
  how: `Check if your device can detect your location, and try again.`,
  button: {
    primary: `Try again`,
    secondary: `Close`,
  },
};
