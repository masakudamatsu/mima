import styled from 'styled-components';
import {zIndex} from 'src/utils/zIndex';
export const DivModalBackdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: ${zIndex.divModalBackdrop};
`;
