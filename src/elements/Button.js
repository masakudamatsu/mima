import styled, {css} from 'styled-components';

import {color, dimension} from 'src/utils/designtokens';

const resetStyle = css`
  background-color: ${color['white 0']};
  border: none;
`;

const setClickableArea = css`
  height: ${dimension.button['height 100']};
  width: ${dimension.button['width 100']};
`;

const alignButtonLabel = css`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const showButtonAboveMap = css`
  position: absolute;
  z-index: 1;
`;

const positionButton = css`
  bottom: var(--button-bottom, auto);
  left: var(--button-left, auto);
  right: var(--button-right, auto);
  top: var(--button-top, auto);
  &[data-position='top-left'] {
    --button-top: ${dimension.button['height 25']};
    --button-left: ${dimension.button['width 25']};
  }
  &[data-position='top-right'] {
    --button-top: ${dimension.button['height 25']};
    --button-right: ${dimension.button['width 25']};
  }
  &[data-position='bottom-right'] {
    --button-bottom: ${dimension.button[
      'height 50'
    ]}; /* Google Maps's default text legend takes up space (about dimension.button['height 25']) at the bottom */
    --button-right: ${dimension.button['width 25']};
  }
  &[data-position='bottom-right-second'] {
    --button-bottom: ${dimension.button['height 175']};
    --button-right: ${dimension.button['width 25']};
  }
`;

const darkmode = `
  &[data-darkmode='false'] {
    --label-color-default: ${color['dark-grey 100']};
    --label-color-focus: ${color['black 100']};
    --button-color: ${color['white 93']};
    --outline-color: ${color['light-grey 100']};
  }
  &[data-darkmode='true'] {
    --label-color-default: ${color['off-white 100']};
    --label-color-focus: ${color['white 100']};
    --button-color: ${color['mid-grey 80']};
    --outline-color: ${color['off-black 100']};
  }
`;

const setButtonLabelColor = {
  daytime: css`
    & svg {
      fill: ${color['dark-grey 100']};
    }
    &:focus svg,
    &:hover svg {
      fill: ${color['black 100']};
    }
    &:active svg {
      fill: ${color['dark-grey 100']};
    }
  `,
  nighttime: css`
    & svg {
      fill: ${color['off-white 100']};
    }
    &:focus svg,
    &:hover svg {
      fill: ${color['white 100']};
    }
    &:active svg {
      fill: ${color['off-white 100']};
    }
  `,
};
const setButtonColor = {
  daytime: css`
    & #cloud {
      fill: ${color['white 93']};
    }
  `,
  nighttime: css`
    & #cloud {
      fill: ${color['mid-grey 80']};
    }
  `,
};

const setButtonShadow = {
  daytime: css`
    & #cloud {
      stroke: ${color['light-grey 100']};
    }
    & svg {
      filter: drop-shadow(
          ${dimension.shadow['offset']} ${dimension.shadow['blur layer 1']}
            ${color['black 33']}
        )
        drop-shadow(
          ${dimension.shadow['offset']} ${dimension.shadow['blur layer 2']}
            ${color['black 33']}
        )
        drop-shadow(
          ${dimension.shadow['offset']} ${dimension.shadow['blur layer 3']}
            ${color['black 33']}
        );
    }
    &:focus #cloud,
    &:hover #cloud {
      stroke: ${color['focus-blue 100']};
    }
    &:focus svg,
    &:hover svg {
      filter: drop-shadow(
        ${dimension.glow['offset']} ${dimension.glow['blur daytime']}
          ${color['focus-blue 100']}
      );
    }
    &:active svg {
      filter: none;
    }
    &:active #cloud {
      stroke: none;
    }
  `,
  nighttime: css`
    & #cloud {
      stroke: ${color['off-black 100']};
    }
    & svg {
      filter: drop-shadow(
          ${dimension.shadow['offset']} ${dimension.shadow['blur layer 1']}
            ${color['black 60']}
        )
        drop-shadow(
          ${dimension.shadow['offset']} ${dimension.shadow['blur layer 2']}
            ${color['black 60']}
        )
        drop-shadow(
          ${dimension.shadow['offset']} ${dimension.shadow['blur layer 3']}
            ${color['black 60']}
        );
    }
    &:focus #cloud,
    &:hover #cloud {
      stroke: ${color['white 40']};
    }
    &:focus svg,
    &:hover svg {
      filter: drop-shadow(
        ${dimension.glow['offset']} ${dimension.glow['blur nighttime']}
          ${color['white 100']}
      );
    }
    &:active svg {
      filter: none;
    }
    &:active #cloud {
      stroke: none;
    }
  `,
};

// Group CSS utilities
const styleCloudButton = css`
  ${resetStyle}
  ${setClickableArea}
  ${alignButtonLabel}
  ${showButtonAboveMap}
  ${positionButton}
`;
const colorCloudButton = {
  daytime: css`
    ${setButtonLabelColor.daytime}
    ${setButtonColor.daytime}
    ${setButtonShadow.daytime}
  `,
  nighttime: css`
    ${setButtonLabelColor.nighttime}
    ${setButtonColor.nighttime}
    ${setButtonShadow.nighttime}
  `,
};

// Define Button components
export const Button = {
  Daytime: styled.button`
    ${styleCloudButton}
    ${colorCloudButton.daytime}
  `,
  Nighttime: styled.button`
    ${styleCloudButton}
    ${colorCloudButton.nighttime}
  `,
};
