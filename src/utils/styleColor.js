const cloudWhite = `rgba(255, 255, 255, 0.93)`; // 17.96 to 1 against black https://contrast-ratio.com/#rgba%28255%2C255%2C255%2C0.93-on-black
const cloudTransparent = `rgba(255, 255, 255, 0)`; // Same RGB values with cloudWhite
const cloudGrey = `rgb(148, 148, 148)`; // 3.03 to 1 against white https://contrast-ratio.com/#rgb%28148%2C148%2C148%29-on-white
const shadowGrey = `rgba(0, 0, 0, 0.42)`; // 3.03 to 1 against white https://contrast-ratio.com/#rgba%280%2C0%2C0%2C0.42%29-on-white
const focusBlue = `rgb(18 89 229)`; // extracted from Chrome's focus outline color

const iconGrey = `rgb(90, 90, 90)`; // 3.04 to 1 against black https://contrast-ratio.com/#rgb%2890%2C90%2C90%29-on-black
const iconBlack = `rgb(3, 3, 3)`;

export const cloud = {
  fill: cloudWhite,
  stroke: cloudGrey,
  shadow: {
    default: shadowGrey,
    focus: focusBlue,
  },
  transparent: cloudTransparent,
};

export const icon = {
  default: iconGrey,
  focus: iconBlack,
};
