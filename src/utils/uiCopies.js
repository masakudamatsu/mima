export const loadingMessage = {
  create: 'Saving your place note...',
  update: 'Saving changes...',
  delete: placeName => `Deleting ${placeName}...`,
};

export const modal = {
  delete: {
    title: placeName => `Deleting ${placeName}`,
    body: placeName =>
      `Are you sure you want to delete ${placeName}? This action cannot be undone.`,
  },
};

export const loginPage = {
  titleText: 'My Ideal Map',
  fieldLabel: 'Log in with your email address',
  fieldPlaceholder: 'yourname@example.com',
  buttonLabel: 'Log in',
  emailSentMessage: {
    title: emailAddress => `Login link was sent to ${emailAddress}`,
    paragraphOne: `In your inbox, look for a message entitled “Log in to My Ideal Map”.`,
    paragraphTwo: `The message might end up in your spam folder.`,
    paragraphThree: `Click the button below if you entered a wrong email address.`,
  },
  tryAgainButtonLabel: 'Try Again',
  loginFailureMessage: {
    title: `Login fails`,
    paragraphOne: `Something went wrong during the login process.`,
    paragraphTwo: `Please try again. If the problem persists, contact us.`,
  },
  contactSupportButtonLabel: 'Contact Us',
};

export const signupPage = {
  titleText: 'My Ideal Map',
  fieldLabel: 'Sign up with your email address',
  fieldPlaceholder: 'yourname@example.com',
  buttonLabel: 'Sign up',
  emailSentMessage: {
    title: emailAddress => `Sign-up link was sent to ${emailAddress}`,
    paragraphOne: `In your inbox, look for a message entitled “Log in to My Ideal Map”.`,
    paragraphTwo: `The message might end up in your spam folder.`,
    paragraphThree: `In case you've already signed up with us, don't worry. Simply click the link in the message.`,
  },
  tryAgainButtonLabel: 'Try Again',
  loginFailureMessage: {
    title: `Sign-up fails`,
    paragraphOne: `Something went wrong during the sign-up process.`,
    paragraphTwo: `Please try again. If the problem persists, contact us.`,
  },
  contactSupportButtonLabel: 'Contact Us',
};

export const userLocationMarkerLabel = 'You are here!';

export const linkText = {
  searchedPlace: 'See more detail on Google Maps',
};

export const buttonLabel = {
  cancel: 'Cancel',
  close: 'Close',
  closePlaceDetail: 'Close place detail',
  closeSearchbox: 'Close search box',
  delete: 'Delete',
  edit: 'Edit',
  locator: {
    default: 'Track your location',
    activated: 'Snap to your location',
    deactivate: 'Stop tracking your location',
  },
  menu: 'Show menu',
  save: 'Save place',
  saveEdit: 'Save',
  saveSearchedPlace: 'Save',
  search: 'Search place',
  searchSubmit: 'Submit search query',
};

export const menuLabel = 'Menu';
export const editorLabel = 'Edit place info';

export const searchBoxLabel = {
  ariaLabel: 'Search for a place on the map',
  placeholder: 'Enter place name or address',
  listbox: 'Autocomplete suggestions',
};

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
