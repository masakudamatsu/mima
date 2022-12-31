import styled, {css} from 'styled-components';
import {animation} from 'src/utils/designtokens';

const animateRipple = css`
  animation-duration: ${animation.toggleOut.duration};
  animation-fill-mode: ${animation.toggleOut.ripple.fillMode};
  animation-name: ${animation.toggleOut.ripple.scale};
  animation-timing-function: ${animation.toggleOut.easing};
`;

const shapeRipple = `
  border-radius: 50%;
`;

const positionRipple = `
  position: absolute;
`;

export const SpanRipple = styled.span`
  ${shapeRipple}
  ${positionRipple}
  ${animateRipple}
`;
