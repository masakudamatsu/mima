import {keyframes} from 'styled-components';
import {round} from './round';

export const color = {
  // both
  'white 100': `rgb(255,255,255)`,

  // daytime
  'white 93': `rgba(255,255,255,0.93)`,
  'white 75': `rgba(255,255,255,0.75)`,
  'day-light-grey 100': '#aaaaaa', // 9.03 = day-mid-grey 100 * 3
  'light-grey 100': `rgb(148, 148, 148)`, // 6.92 white 100 / 3
  'day-mid-grey 100': 'rgb(137, 137, 137)', // '#898989', // 6 = pale-cyan 100 / 1.5
  'day-dark-grey 100': '#767676', // 4.62 = white 100 / 4.5
  'dark-grey 100': `rgb(90,90,90)`, // 3.04 = 3 * black
  'background for dark-grey text 100': `rgb(209, 209, 209)`, // 4.51 * dark-grey 100
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
  'glass-grey 90': `rgba(113,113,113,0.9)`, // to ensure 4.5:1 contrast against `off-white 100` when blurred with dull-orange 100
  'glass-grey 75': `rgba(113,113,113,0.75)`, // to ensure 4.5:1 contrast against `off-white 100` when blurred with dull-orange 100
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
  breakpoint: {
    divPopup: {
      padding: '540px',
    },
    headerEditor: {
      buttonWidth: '380px',
    },
  },
  button: {
    'height 175': '84px',
    'height 100': '48px',
    'height 50': '24px',
    'height 25': '12px',
    'width 100': '56px',
    'width 25': '14px',
    'minimum target size 200': '96px',
    'minimum target size 150': '72px',
    'minimum target size 100': '48px', // https://web.dev/accessible-tap-targets/
    'minimum target size 75': '36px',
    'minimum target size 50': '24px', // https://web.dev/accessible-tap-targets/
    'minimum target size 25': '12px',
    'minimum target spacing 100': '8px', // https://web.dev/accessible-tap-targets/
    'minimum target spacing 50': '4px',
    'border radius 100': '4px',
    'border width 200': '2px',
    'border width 100': '1px',
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
  popup: {
    'margin 66': `16px`,
    'margin 100': `24px`,
    'margin 133': `32px`,
    'margin 200': `48px`,
  },
  searchBox: {
    'border width 100': '2px',
    'side margin 100': '8px',
    'max-width': '561px' /* follow google.com */,
  },
};

export const animation = {
  showDetail: {
    // for opening place detail popup
    duration: '250ms', // to coordinate with the snapping of the place mark to one-third from the top
    easing: 'linear',
    opacity: keyframes`
      0% { 
        opacity: 0;
      }
      100% { 
        opacity: 1;
      }
    `,
    fillMode: 'backwards',
  },
  // For opening menu / search box
  toggleIn: {
    // Duration and keyframes follow the "Container Transform" spec of Material Design 2 (https://m2.material.io/design/motion/the-motion-system.html#container-transform)
    // Easing is replaced with deceleration because the original spec makes animation look mechine-ish
    duration: '300ms',
    easing: 'cubic-bezier(0.0, 0.0, 0.2, 1)', // Decelerated easing in Material Design 2 (https://m2.material.io/design/motion/speed.html#easing)
    origin: 'top right',
    button: {
      opacity: keyframes`
        30% { /* mocking 90ms duration */
          opacity: 0; 
        }
        100% {
          opacity: 0;
        }
      `,
      scale: keyframes`
        100% {
          transform: scale(4); /* manually adjusted to make it look seamless */
        }
      `,
      fillMode: 'forwards',
    },
    popup: {
      opacity: keyframes`
        0%,
        30% { /* mocking 90ms delay */
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      `,
      scale: keyframes`
        0% {
          transform: scale(0);
        }
        100% {
          transform: scale(1);
        }
      `,
      fillMode: 'backwards',
    },
    reducedMotion: {
      button: {
        opacity: keyframes`
          0% { 
            opacity: 1;
          }
          100% { /* no reason to finish animation early */
            opacity: 0;
          }
        `,
      },
      popup: {
        opacity: keyframes`
          0% { /* no reason to delay the beginning of animation */
            opacity: 0;
          }
          100% { 
            opacity: 1;
          }
        `,
      },
    },
  },
  // For closing menu / search box / place detail
  toggleOut: {
    duration: '300ms', // Complex animation requires longer duration while long duration will increase "time to interactive" for cloud buttons
    easing: 'linear', // Decelerated easing would make the ripple-erasing effect less noticeable
    origin: null,
    button: {
      opacity: keyframes`
        0% {
          opacity: 0; 
        }
        100% {
          opacity: 1;
        }
      `,
      fillMode: 'backwards',
    },
    popup: {
      opacity: keyframes`
        0% { 
          opacity: 1;
        }
        100% { 
          opacity: 0;
        }
      `,
      scale: null,
      fillMode: 'forwards',
    },
    ripple: {
      scale: keyframes`
        from {
          transform: scale(0);
        }
        to {
          transform: scale(1);
        }
      `,
      fillMode: 'backwards',
    },
    reducedMotion: {
      duration: '250ms', // no reason to delay the end of animation for the ripple effect to be noticeable
      popup: {
        opacity: keyframes`
          0% { /* no reason to delay the beginning of animation for the ripple effect to be noticeable */
            opacity: 1;
          }
          100% { 
            opacity: 0;
          }
        `,
      },
    },
  },
  fadeIn: keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `,
  fadeOut: keyframes`
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  `,
  flashing: keyframes`
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }    
  `,
  'ripple 100': keyframes`
    to {
      transform: scale(4);
      opacity: 0;
    }  
  `,
};
export const duration = {
  flashing: '1500ms',
  menu: {
    enter: {
      opacity: '100ms', // more than 100ms will suggest the lack of response
      transform: '450ms',
    },
    exit: '400ms',
  },
  modal: {
    enter: 300,
    exit: 250,
  },
};

export const easing = {
  accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
  decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  linear: 'linear',
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
}; // source: https://m2.material.io/design/motion/speed.html#easing

export const buttonCircle = {
  clickableArea: dimension.button['minimum target size 100'],
};

// Font styling

const metrics = {
  'Noto Sans Regular': {
    fontFamily: `'Noto Sans', Verdana, sans-serif`,
    fontWeight: 400,
    unitsPerEm: 2048, // head.unitsPerEm
    capHeight: 1462, // os2.sCapHeight
    xHeight: 1098, // os2.sxHeight
    ascender: 2189, // hhea.ascender
    descender: 600, // - hhea.descender
  },
  'Noto Sans Display Bold': {
    fontFamily: `'Noto Sans Display', Georgia, sans-serif`,
    fontWeight: 700,
    unitsPerEm: 1000, // head.unitsPerEm
    xHeight: 546, // os2.sxHeight
    capHeight: 714, // os2.sCapHeight
    ascender: 1069, // hhea.ascender
    descender: 293, // - hhea.descender
  },
};

const fontScale =
  metrics['Noto Sans Regular'].capHeight / metrics['Noto Sans Regular'].xHeight;

export const capHeight = {
  10: 12 / fontScale,
  100: 12, // minimum cap height for Noto Sans Regular to be at font-size of 16px
  200: 12 * fontScale,
  300: 12 * Math.pow(fontScale, 2),
};

const getFontSize = ({capHeight, metrics}) => {
  return capHeight / (metrics.capHeight / metrics.unitsPerEm);
};
export const getSpaceToCrop = (
  where,
  {fontSize, lineHeight, normalLineHeight, font},
) => {
  const addedDefaultSpace = ((normalLineHeight - 1) / 2) * font.unitsPerEm;
  let intrinsicSpace;
  if (where === 'top') {
    intrinsicSpace = font.ascender - font.capHeight - addedDefaultSpace;
  }
  if (where === 'bottom') {
    intrinsicSpace = font.descender - addedDefaultSpace;
  }
  const addedNewSpace = ((lineHeight - 1) / 2) * font.unitsPerEm;
  const pxPerUnit = fontSize / font.unitsPerEm;
  return (intrinsicSpace + addedNewSpace) * pxPerUnit;
};

export const bodyText = {
  fontFamily: metrics['Noto Sans Regular'].fontFamily,
  fontSize: getFontSize({
    capHeight: capHeight[100],
    metrics: metrics['Noto Sans Regular'],
  }),
  fontWeight: metrics['Noto Sans Regular'].fontWeight,
  get lineHeight() {
    const xHeight = capHeight[10];
    const spaceBetweenLines = capHeight[100];
    const lineHeight = xHeight + spaceBetweenLines;
    return round(lineHeight / this.fontSize, 4);
  },
  normalLineHeight: 1.42,
  get spaceTop() {
    return getSpaceToCrop('top', {
      fontSize: this.fontSize,
      font: metrics['Noto Sans Regular'],
      lineHeight: this.lineHeight,
      normalLineHeight: this.normalLineHeight,
    });
  },
  get spaceBottom() {
    return getSpaceToCrop('bottom', {
      fontSize: this.fontSize,
      font: metrics['Noto Sans Regular'],
      lineHeight: this.lineHeight,
      normalLineHeight: this.normalLineHeight,
    });
  },
  get spaceBetweenParagraphs() {
    return capHeight[200] - this.spaceTop - this.spaceBottom;
  },
  wordSpacing: 7, // measured by myself
};

export const boldText = {
  fontFamily: metrics['Noto Sans Display Bold'].fontFamily,
  fontWeight: metrics['Noto Sans Display Bold'].fontWeight,
};
export const heading = {
  fontFamily: metrics['Noto Sans Display Bold'].fontFamily,
  fontSize: {
    narrowScreen: getFontSize({
      capHeight: capHeight[100],
      metrics: metrics['Noto Sans Display Bold'],
    }),
    wideScreen: getFontSize({
      capHeight: capHeight[300],
      metrics: metrics['Noto Sans Display Bold'],
    }),
  },
  fontWeight: metrics['Noto Sans Display Bold'].fontWeight,
  get lineHeight() {
    const xHeight = {
      narrowScreen:
        this.fontSize.narrowScreen *
        (metrics['Noto Sans Display Bold'].xHeight /
          metrics['Noto Sans Display Bold'].unitsPerEm),
      wideScreen:
        this.fontSize.wideScreen *
        (metrics['Noto Sans Display Bold'].xHeight /
          metrics['Noto Sans Display Bold'].unitsPerEm),
    };
    const spaceBetweenLines = xHeight;
    const lineHeight = {
      narrowScreen: xHeight.narrowScreen + spaceBetweenLines.narrowScreen,
      wideScreen: xHeight.wideScreen + spaceBetweenLines.wideScreen,
    };
    return {
      narrowScreen: round(
        lineHeight.narrowScreen / this.fontSize.narrowScreen,
        4,
      ),
      wideScreen: round(lineHeight.wideScreen / this.fontSize.wideScreen, 4),
    };
  },
  normalLineHeight: 1.43,
  get spaceTop() {
    return {
      narrowScreen: getSpaceToCrop('top', {
        fontSize: this.fontSize.narrowScreen,
        font: metrics['Noto Sans Display Bold'],
        lineHeight: this.lineHeight.narrowScreen,
        normalLineHeight: this.normalLineHeight,
      }),
      wideScreen: getSpaceToCrop('top', {
        fontSize: this.fontSize.wideScreen,
        font: metrics['Noto Sans Display Bold'],
        lineHeight: this.lineHeight.wideScreen,
        normalLineHeight: this.normalLineHeight,
      }),
    };
  },
  get spaceBottom() {
    return {
      narrowScreen: getSpaceToCrop('bottom', {
        fontSize: this.fontSize.narrowScreen,
        font: metrics['Noto Sans Display Bold'],
        lineHeight: this.lineHeight.narrowScreen,
        normalLineHeight: this.normalLineHeight,
      }),
      wideScreen: getSpaceToCrop('bottom', {
        fontSize: this.fontSize.wideScreen,
        font: metrics['Noto Sans Display Bold'],
        lineHeight: this.lineHeight.wideScreen,
        normalLineHeight: this.normalLineHeight,
      }),
    };
  },
  get paddingBottom() {
    return {
      narrowScreen: capHeight[100] - this.spaceBottom.narrowScreen,
      wideScreen: capHeight[300] - this.spaceBottom.wideScreen,
    };
  },
  get paddingTop() {
    return {
      narrowScreen: capHeight[100] - this.spaceTop.narrowScreen,
      wideScreen: capHeight[300] - this.spaceTop.wideScreen,
    };
  },
};

export const h2PlaceName = {
  fontFamily: metrics['Noto Sans Display Bold'].fontFamily,
  fontSize: getFontSize({
    capHeight: capHeight[200],
    metrics: metrics['Noto Sans Display Bold'],
  }),
  fontWeight: metrics['Noto Sans Display Bold'].fontWeight,
  get lineHeight() {
    const xHeight =
      this.fontSize *
      (metrics['Noto Sans Display Bold'].xHeight /
        metrics['Noto Sans Display Bold'].unitsPerEm);
    const spaceBetweenLines = xHeight;
    const lineHeight = xHeight + spaceBetweenLines;
    return round(lineHeight / this.fontSize, 4);
  },
  normalLineHeight: 1.43,
  get spaceTop() {
    return getSpaceToCrop('top', {
      fontSize: this.fontSize,
      font: metrics['Noto Sans Display Bold'],
      lineHeight: this.lineHeight,
      normalLineHeight: this.normalLineHeight,
    });
  },
  get spaceBottom() {
    return getSpaceToCrop('bottom', {
      fontSize: this.fontSize,
      font: metrics['Noto Sans Display Bold'],
      lineHeight: this.lineHeight,
      normalLineHeight: this.normalLineHeight,
    });
  },
  get paddingBottom() {
    return capHeight[200] - this.spaceBottom;
  },
  get paddingTop() {
    return capHeight[200] - this.spaceTop;
  },
};
