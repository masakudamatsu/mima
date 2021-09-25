export const color = {
  // both
  'white 100': `rgb(255,255,255)`,

  // daytime
  'white 93': `rgba(255,255,255,0.93)`,
  'light-grey 100': `rgb(148, 148, 148)`, // 6.92 white 100 / 3
  'dark-grey 100': `rgb(90,90,90)`, // 3.04 = 3 * black
  'focus-blue 100': `rgb(69, 159, 189)`, // 6.95 = streets.day / 3
  'black 100': `rgb(3,3,3)`, // to avoid black-smearing on OLED screens
  'black 33': `rgba(3,3,3,0.33)`,

  // nighttime
  'white 40': `rgba(255,255,255,0.4)`,
  'off-white 100': `rgb(218,218,218)`, // 15.02 = white 100 / 1.5
  'mid-grey 80': `rgba(123,123,123,0.8)`, // 4.96 = dull-orange 100
  'off-black 100': `#2b2b2b`, // 1.48 = black * 1.5
  'black 60': `rgba(3,3,3,0.6)`,

  // uncategoriezed
  'white 0': `rgba(255,255,255,0)`,
};
