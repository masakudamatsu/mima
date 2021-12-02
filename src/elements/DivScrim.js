import styled from 'styled-components';
import {zIndex} from 'src/utils/zIndex';

export const DivScrim = styled.div`
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: ${zIndex.divScrim};
`;
