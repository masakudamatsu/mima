import styled from 'styled-components';
import {bodyText, dimension} from 'src/utils/designtokens';
import {remify} from 'src/utils/remify';

const drawDividers = `
  border-bottom: 1px solid var(--menu-border-color);
  border-top: 1px solid var(--menu-border-color);
  & li:not(:first-of-type) {
    border-top: 1px solid var(--menu-border-color);
  }
`;

const setListItemSize = `
  & li {
    padding: ${dimension.button['minimum target spacing 50']} 0;
  }
  & li a,
  & li button {
    height: ${dimension.button['minimum target size 100']};
  }
`;

const positionListItemContent = `
  & a,
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
    fill: var(--menu-item-color);
  }
`;

const styleListItemText = `
  color: var(--menu-item-color);
  font-weight: 700;
`;

const styleDisabledState = `
  & button[disabled],
  & a:not([href]) {
    cursor: not-allowed;
    opacity: 0.2;
  }
`;
const styleListItemLink = `
  & a {
    color: var(--menu-item-color);
    text-decoration: none;
  }
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
  ${styleDisabledState}
  ${styleListItemLink}
`;
