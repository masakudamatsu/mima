import {css} from 'styled-components';
import remify from './remify';

export function cssLinkText({
  backgroundColor,
  backgroundColorOnHover,
  linkTextColor,
  underlineColor = 'currentColor',
  baselinePosition,
  underlineWidth,
  spaceBelowBaseline,
}) {
  return css`
    &:link,
    &:visited {
      background: ${backgroundColorOnHover}; /* Fallback for browsers incompatible with CSS Gradient (https://caniuse.com/css-gradients) */
      background: linear-gradient(
        to bottom,
        ${underlineColor} 100%,
        ${underlineColor}
      ); /* make the upper half transparent, to explicitly control the distance between the baseline and the underline. */
      background-position: 0 ${remify(baselinePosition + spaceBelowBaseline)};
      background-repeat: no-repeat;
      background-size: 100% ${underlineWidth}px;
      color: ${linkTextColor};
      cursor: pointer;
      text-decoration: none;
      text-shadow: 0.03em 0 ${backgroundColor}, -0.03em 0 ${backgroundColor},
        0 0.03em ${backgroundColor}, 0 -0.03em ${backgroundColor}; /* following https://eager.io/blog/smarter-link-underlines/ */
    }

    &:focus,
    &:hover {
      background: ${backgroundColorOnHover};
      outline: none;
      text-shadow: none;
    }

    &:active {
      background: none; /* To make it blink */
    }

    &:visited:focus,
    &:visited:hover {
      background: ${backgroundColorOnHover};
      outline: none;
      text-shadow: none;
    }

    &:visited:active {
      background: none;
    }
  `;
}
