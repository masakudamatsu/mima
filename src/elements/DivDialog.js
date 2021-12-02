import styled from 'styled-components';

export const DivDialog = styled.div`
  &[aria-hidden='true'] {
    display: none;
  }
  &[aria-hidden='false'] {
    display: block;
  }
`;
