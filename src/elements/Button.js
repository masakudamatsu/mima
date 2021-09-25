import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';

import {button} from 'src/utils/styleShape';
import {color} from 'src/utils/designtokens';

const resetStyle = css`
  background-color: ${color['white 0']};
  border: none;
`;

const setClickableArea = css`
  height: ${button.height}px;
  width: ${button.width}px;
`;

const alignButtonLabel = css`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const positionButton = css`
  position: absolute;
  z-index: 1;
  ${({$topLeft}) =>
    $topLeft &&
    `
    top: ${button.height / 4}px;
    left: ${button.width / 4}px;
  `}
  ${({$topRight}) =>
    $topRight &&
    `
    top: ${button.height / 4}px; 
    right: ${button.width / 4}px; 
  `}
  ${({$bottomRight}) =>
    $bottomRight &&
    `
    bottom: ${
      button.height / 2
    }px; /* Google Maps's default text legend takes up space (about 1/4 of button.height) at the bottom */
    right: ${button.width / 4}px;
  `}
  ${({$bottomRightSecond}) =>
    $bottomRightSecond &&
    `
    bottom: ${button.height / 2 + button.height + button.height / 4}px;
    right: ${button.width / 4}px;
  `}
`;

const buttonLabelColor = {
  default: color['dark-grey 100'],
  focus: color['black 100'],
};
const setButtonLabelColor = css`
  & svg {
    fill: ${buttonLabelColor.default};
  }
  &:focus svg,
  &:hover svg {
    fill: ${buttonLabelColor.focus};
  }
  &:active svg {
    fill: ${buttonLabelColor.default};
  }
`;

const setButtonColor = css`
  & #cloud {
    fill: ${color['white 93']};
  }
`;

const buttonShadow = {
  offset: '0px 0px',
  blur: {
    default: {
      layer1: '1px',
      layer2: '2px',
      layer3: '4px',
    },
    focus: `5px`,
  },
  color: {
    default: color['black 33'],
    focus: color['focus-blue 100'],
  },
};

const setButtonShadow = css`
  & #cloud {
    stroke: ${color['light-grey 100']};
  }
  & svg {
    filter: drop-shadow(
        ${buttonShadow.offset} ${buttonShadow.blur.default['layer1']}
          ${buttonShadow.color.default}
      )
      drop-shadow(
        ${buttonShadow.offset} ${buttonShadow.blur.default['layer2']}
          ${buttonShadow.color.default}
      )
      drop-shadow(
        ${buttonShadow.offset} ${buttonShadow.blur.default['layer3']}
          ${buttonShadow.color.default}
      );
  }
  &:focus #cloud,
  &:hover #cloud {
    stroke: ${color['focus-blue 100']};
  }
  &:focus svg,
  &:hover svg {
    filter: ${`drop-shadow(
      ${buttonShadow.offset}
      ${buttonShadow.blur.focus}
      ${buttonShadow.color.focus}
    )`};
  }
  &:active svg {
    filter: none;
  }
  &:active #cloud {
    stroke: none;
  }
`;

const Button = styled.button.attrs({
  type: 'button',
})`
  ${resetStyle}
  ${setClickableArea}
  ${alignButtonLabel}
  ${positionButton}

  ${setButtonLabelColor}
  ${setButtonColor}
  ${setButtonShadow}
`;

Button.propTypes = {
  $bottomRight: PropTypes.bool,
  $bottomRightSecond: PropTypes.bool,
  $topLeft: PropTypes.bool,
  $topRight: PropTypes.bool,
};

export default Button;
