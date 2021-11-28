import styled from 'styled-components';
import {dimension} from 'src/utils/designtokens';
export const HeaderEditor = styled.header`
  align-items: center;
  border-bottom: 1px solid var(--button-outline-color);
  display: flex;
  justify-content: space-between;
  width: 100%;
  & button {
    height: ${dimension.button['minimum target size 100']};
    text-transform: uppercase;
    width: ${dimension.button['minimum target size 150']};
    @media screen and (min-width: ${dimension.breakpoint.headerEditor
        .buttonWidth}) {
      width: ${dimension.button['minimum target size 200']};
    }
  }
  & button:focus {
    border: 1px solid var(--button-outline-color-focus);
    border-radius: 8px;
    box-shadow: ${dimension.glow['offset']}
      var(--button-shadow-blur-radius-focus) var(--button-shadow-color-focus);
  }
  & button[data-save] {
    color: var(--dialog-button-color);
  }
`;
