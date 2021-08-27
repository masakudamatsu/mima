import styled, {css, keyframes} from 'styled-components';
import PropTypes from 'prop-types';
import {minTargetSize} from 'src/utils/styleShape';

const resetStyle = css`
  border: none;
`;

const bgWhite = css`
  background-color: #fff;
`;

const colorBlack = css`
  color: rgba(0, 0, 0, 0.87);
`;

const colorGrey = css`
  color: #9aa0a6;
`;

const alignLabel = css`
  align-items: center;
  display: flex;
`;

const minSideMargin = 8;
const rightAlignOverMap = css`
  position: absolute;
  right: ${minSideMargin}px;
  bottom: ${minSideMargin * 2}px; /* temporary */
  z-index: 1;
`;

const flashing = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Button = styled.button.attrs({
  type: 'button',
})`
  ${resetStyle}
  ${bgWhite}
  ${colorGrey}
  fill: currentColor;
  height: ${minTargetSize}px;
  width: ${minTargetSize}px;

  ${alignLabel}
  ${rightAlignOverMap}

  &:focus,
  &:hover {
    ${colorBlack}
  }
  &:active {
    ${colorGrey}
  }

  ${({$loading}) =>
    $loading
      ? css`
          animation: ${flashing} 2s linear infinite;
        `
      : ``}
`;

Button.propTypes = {
  $loading: PropTypes.bool,
};
export default Button;
