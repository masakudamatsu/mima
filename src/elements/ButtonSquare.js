import styled, {css} from 'styled-components';

import {color, dimension} from 'src/utils/designtokens';

const resetStyle = css`
  background-color: ${color['white 0']};
  border: none;
`;

const setClickableArea = css`
  height: ${dimension.button['minimum target size 100']};
  width: ${dimension.button['minimum target size 100']};
`;

const alignButtonLabel = css`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const positionButton = css`
  position: absolute;
  top: ${dimension.button['minimum target size 50']};
  right: ${dimension.button['minimum target size 50']};
`;

const setButtonLabelColor = css`
  & svg {
    fill: var(--button-label-color-default);
  }
  &:focus svg,
  &:hover svg {
    fill: var(--button-label-color-focus);
  }
  &:active svg {
    fill: var(--button-label-color-default);
  }
`;

const setColorScheme = css`
  &[data-darkmode='false'] {
    --button-label-color-default: ${color['dark-grey 100']};
    --button-label-color-focus: ${color['black 100']};
  }
  &[data-darkmode='true'] {
    --button-label-color-default: ${color['off-white 100']};
    --button-label-color-focus: ${color['white 100']};
  }
`;

// Define Button components
export const ButtonSquare = styled.button`
  ${resetStyle}
  ${setClickableArea}
  ${alignButtonLabel}
  ${positionButton}
  ${setButtonLabelColor}
  ${setColorScheme}
`;
