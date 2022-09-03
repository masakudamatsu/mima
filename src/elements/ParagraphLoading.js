import styled, {css} from 'styled-components';
import {animation, duration, easing} from 'src/utils/designtokens';
import {zIndex} from 'src/utils/zIndex';

const placeOverBackground = `
  position: absolute;
  z-index: ${zIndex.paragraphLoading};
`;

const placeTextAtScreenCenter = `
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const animateAppearance = css`
  animation: ${animation.flashing} ${duration.flashing} ${easing.linear}
    infinite;
`;

export const ParagraphLoading = styled.p`
  ${placeTextAtScreenCenter}
  ${placeOverBackground}
  ${animateAppearance}
`;
