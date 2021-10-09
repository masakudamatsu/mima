export const color = {
  // both
  'white 100': `rgb(255,255,255)`,

  // daytime
  'white 93': `rgba(255,255,255,0.93)`,
  'day-light-grey 100': '#aaaaaa', // 9.03 = day-mid-grey 100 * 3
  'light-grey 100': `rgb(148, 148, 148)`, // 6.92 white 100 / 3
  'day-mid-grey 100': 'rgb(137, 137, 137)', // '#898989', // 6 = pale-cyan 100 / 1.5
  'day-dark-grey 100': '#767676', // 4.62 = white 100 / 4.5
  'dark-grey 100': `rgb(90,90,90)`, // 3.04 = 3 * black
  'pale-green 100': '#c0dac0', // 14.03 = white 100 / 1.5
  'pale-cyan 100': '#99b2b2', // 9.36 = pale-green 100 / 1.5
  'focus-blue 100': `rgb(69, 159, 189)`, // 6.95 = streets.day / 3
  'google-blue 100': `#4285F4`, // https://usbrandcolors.com/google-colors/
  'google-blue-dark 100': `#61a0bf`,
  'google-blue-light 100': `#1bb6ff`,
  'black 100': `rgb(3,3,3)`, // to avoid black-smearing on OLED screens
  'black 33': `rgba(3,3,3,0.33)`,

  // nighttime
  'white 40': `rgba(255,255,255,0.4)`,
  'off-white 100': `rgb(218,218,218)`, // 15.02 = white 100 / 1.5
  'night-light-grey 100': '#929292', // 6.74 = off-black 100 * 4.5
  'mid-grey 80': `rgba(123,123,123,0.8)`, // 4.96 = dull-orange 100
  'mid-grey 100': `rgb(123, 123, 123)`,
  'night-mid-grey 100': '#757575', // 4.55 = off-black 100 * 3
  'dull-orange 100': '#ae6f2f', // 5.11 = greyish-green 100 * 1.5
  'greyish-green 100': '#4c664c', // 3.31 = greyish-cyan 100 * 1.5
  'greyish-cyan 100': '#344d4d', // 2.31 = off-black 100 * 1.5
  'off-black 100': 'rgb(43, 43, 43)', // `#2b2b2b`, // 1.48 = black * 1.5
  'black 60': `rgba(3,3,3,0.6)`,

  // uncategoriezed
  'white 0': `rgba(255,255,255,0)`,
};

export const map = {
  streets: {
    day: color['white 100'],
    night: color['dull-orange 100'],
  },
  greenspaces: {
    day: color['pale-green 100'],
    night: color['greyish-green 100'],
  },
  waterways: {
    day: color['pale-cyan 100'],
    night: color['greyish-cyan 100'],
  },
  cityblocks: {
    day: color['day-mid-grey 100'],
    night: color['off-black 100'],
  },
  buildings: {
    day: color['day-light-grey 100'],
    night: color['night-mid-grey 100'],
  },
  placelabelfill: {
    day: color['day-dark-grey 100'],
    night: color['night-light-grey 100'],
  },
  placelabelstroke: {
    day: color['white 100'], // = streets.day
    night: color['off-black 100'], // = cityblocks.night
  },
};

export const dimension = {
  button: {
    'height 175': '84px',
    'height 100': '48px',
    'height 50': '24px',
    'height 25': '12px',
    'width 100': '56px',
    'width 25': '14px',
  },
  shadow: {
    offset: '0px 0px',
    'blur layer 1': '1px',
    'blur layer 2': '2px',
    'blur layer 3': '4px',
  },
  glow: {
    offset: '0px 0px',
    'blur daytime': '5px',
    'blur nighttime': '10px',
  },
};
