import styled from 'styled-components';
import {dimension} from 'src/utils/designtokens';

const setTargetSize = `
  & li {
    padding: ${dimension.button['minimum target spacing 50']} 0;
  }
  & li button {
    height: ${dimension.button['minimum target size 100']};
  }
`;

export const ListMenu = styled.ul.attrs(props => ({
  role: 'list', // see https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html
}))`
  list-style: none;
  ${setTargetSize}
`;
