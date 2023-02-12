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

export const signupPage = {
  titleText: 'My Ideal Map',
  buttonLabel: 'Start free trial',
};

export const loginPage = {
  titleText: 'My Ideal Map',
  buttonLabel: 'Log in',
};

export const subscribePage = {
  titleText: 'My Ideal Map',
  offer: {
    h2: 'Free trial period expires',
    bodyText: {
      subscribe:
        'Your 30-day free trial period is now over. Please start a monthly subscription by providing your billing information.',
      logout:
        'Or you can logout for now. You will be redirected to this page next time you log in.',
    },
    buttonLabel: 'Subscribe',
  },
  success: {
    h2: 'Payment received',
    bodyText:
      'Thank you for subscribing to My Ideal Map! You will receive an email confirmation.',
    buttonLabel: 'Go to App',
  },
  canceled: {
    h2: 'Payment canceled',
    bodyText: {
      subscribe:
        'You have not been charged. Please try again to start a monthly subscription.',
      logout:
        'Or you can logout for now. Next time you log in, you will be redirected to the page from which you can start a subscription.',
    },
    buttonLabel: 'Subscribe',
  },
  unpaid: {
    h2: 'Subscription canceled',
    bodyText: {
      subscribe:
        'Sorry, but we have cancelled your subscription due to the repeated failure of processing your payment for renewal. To subscribe again, press the "Subscribe" button below to provide your billing information.',
      data: 'Your data will be recovered once your new subscription starts.',
      logout:
        'Or you can logout for now. You will be redirected to this page next time you log in.',
    },
    buttonLabel: 'Subscribe',
  },
  reoffer: {
    h2: 'Subscription canceled',
    bodyText: {
      subscribe:
        'Your subscription has ended. To subscribe again, press the "Subscribe" button below to provide your billing information.',
      logout:
        'Or you can logout for now. You will be redirected to this page next time you log in.',
    },
    buttonLabel: 'Subscribe',
  },
};

export const renewalPage = {
  titleText: 'My Ideal Map',
  offer: {
    h2: 'Subscription renewal has failed',
    bodyText: {
      renew: `We could not process your payment to renew subscription. To continue using My Ideal Map, please update your payment information.`,
      logout: 'If you wish, you can logout for now.',
    },
    buttonLabel: 'Update payment information',
  },
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
  customerPortal: {
    cancel: 'Cancel subscription',
    reactivate: 'Reactivate subscription',
    update: 'Update billing info',
  },
  delete: 'Delete',
  edit: 'Edit',
  locator: {
    default: 'Track your location',
    activated: 'Snap to your location',
    deactivate: 'Stop tracking your location',
  },
  logout: 'Log out',
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
  noResult: 'No place is found on the map. Try another search term.', // used in Cypress
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
