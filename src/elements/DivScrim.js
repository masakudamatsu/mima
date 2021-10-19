import styled from 'styled-components';
// import PropTypes from 'prop-types';
import {zIndex} from 'src/utils/zIndex';

const DivScrim = styled.div`
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: ${zIndex.divScrim};
`;

// DivScrim.propTypes = {};
export default DivScrim;
