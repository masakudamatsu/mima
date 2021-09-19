import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';

import {button} from 'src/utils/styleShape';
import {cloud, icon} from 'src/utils/styleColor';

const resetStyle = css`
  background-color: ${cloud.transparent};
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

const setIconColor = css`
  & svg {
    fill: ${icon.default};
  }
  &:focus svg,
  &:hover svg {
    fill: ${icon.focus};
  }
  &:active svg {
    fill: ${icon.default};
  }
`;

const setCloudColor = css`
  & #cloud {
    fill: ${cloud.fill};
    stroke: ${cloud.stroke};
  }
  & svg {
    filter: drop-shadow(0px 0px 5px ${cloud.shadow.default});
  }
  &:focus #cloud,
  &:hover #cloud {
    stroke: none;
  }
  &:focus svg,
  &:hover svg {
    filter: drop-shadow(0px 0px 5px ${cloud.shadow.focus});
  }
  &:active svg {
    filter: none;
  }
`;

const Button = styled.button.attrs({
  type: 'button',
})`
  ${resetStyle}
  ${setClickableArea}
  ${alignButtonLabel}
  ${positionButton}

  ${setIconColor}
  ${setCloudColor}
`;

Button.propTypes = {
  $bottomRight: PropTypes.bool,
  $bottomRightSecond: PropTypes.bool,
  $topLeft: PropTypes.bool,
  $topRight: PropTypes.bool,
};

export default Button;
