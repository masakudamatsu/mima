export const locatorButtonLabel = {
  default: 'Start tracking current location',
  activated: 'Show current location',
};

const geolocationApiFails = 'We cannot find where you are.';
export const geolocationNotSupported = {
  what: geolocationApiFails,
  why: `Your browser is not equipped with location services`,
  how: `Please consider using other browsers such as Chrome, Firefox, Microsoft Edge, or Safari.`,
};
export const geolocationPermissionDenied = {
  what: geolocationApiFails,
  why: `You've chosen to keep your location private.`,
  how: `To see your current location on the map, please enable location services with your OS/browser.`,
};
export const geolocationPositionUnavailable = {
  what: geolocationApiFails,
  why: `Your device fails to obtain your location data.`,
  how: `Please check if location services are working with your device, or try again.`,
};

export const dismissDialogButton = `Got it`;
