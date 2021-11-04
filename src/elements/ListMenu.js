import styled from 'styled-components';
import {bodyText, color, dimension} from 'src/utils/designtokens';
import {remify} from 'src/utils/remify';

const setColorScheme = `
  &[data-darkmode='false'] {  
    --button-color: ${color['google-blue 100']};
    --button-label-color-default: ${color['dark-grey 100']};
  }
  &[data-darkmode='true'] {
    --button-color: ${color['google-blue-light 100']};
    --button-label-color-default: ${color['off-white 100']};
  }
`;

const drawDividers = `
  border-bottom: 1px solid var(--button-color);
  border-top: 1px solid var(--button-color);
  & li:not(:first-of-type) {
    border-top: 1px solid var(--button-color);
  }
`;

const setListItemSize = `
  & li {
    padding: ${dimension.button['minimum target spacing 50']} 0;
  }
  & li button {
    height: ${dimension.button['minimum target size 100']};
  }
`;

const positionListItemContent = `
  & button {
    align-items: center;
    display: flex;
  }
  & svg {
    margin-right: ${remify(bodyText.wordSpacing)};
  }
`;

const styleListItemIcons = `
  & svg {
    fill: var(--button-label-color-default);
  }
`;

const styleListItemText = `
  color: var(--button-label-color-default);
  font-weight: 700;
`;

export const ListMenu = styled.ul.attrs(props => ({
  role: 'list', // see https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html
}))`
  list-style: none;
  ${drawDividers}
  ${setListItemSize}
  ${positionListItemContent}
  ${styleListItemIcons}
  ${styleListItemText}
  ${setColorScheme}
`;
