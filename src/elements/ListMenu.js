import styled from 'styled-components';
import {color, dimension} from 'src/utils/designtokens';

const setColorScheme = `
  &[data-darkmode='false'] {  
    --button-color: ${color['google-blue 100']};
  }
  &[data-darkmode='true'] {
    --button-color: ${color['google-blue-light 100']};
  }
`;

const setTargetSize = `
  & li {
    padding: ${dimension.button['minimum target spacing 50']} 0;
  }
  & li button {
    height: ${dimension.button['minimum target size 100']};
  }
`;
const addDividers = `
  & li:not(:first-of-type) {
    border-top: 1px solid var(--button-color);
  }
`;

export const ListMenu = styled.ul.attrs(props => ({
  role: 'list', // see https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html
}))`
  list-style: none;
  ${setTargetSize}
  ${addDividers}
  ${setColorScheme}
`;
