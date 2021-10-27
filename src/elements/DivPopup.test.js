// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';

import {DivPopup} from './DivPopup';

const mockProps = {};

test('renders UI correctly', () => {
  const {container} = render(<DivPopup {...mockProps} />);
  expect(container).toMatchInlineSnapshot(`
.c0 {
  font-family: system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: space-around;
  -webkit-justify-content: space-around;
  -ms-flex-pack: space-around;
  justify-content: space-around;
  position: absolute;
  z-index: 3;
  color: var(--popup-text-color);
  height: calc(100% - 48px);
  bottom: 24px;
  top: 24px;
  background: var(--popup-background-color);
  box-shadow: 0 0 16px 16px var(--popup-shadow-color),0 0 24px 16px var(--popup-shadow-color),0 0 32px 16px var(--popup-shadow-color);
}

.c0[data-darkmode='false'] {
  --popup-background-color: rgba(255,255,255,0.93);
  --popup-shadow-color: rgba(255,255,255,0.63);
  --popup-text-color: rgb(90,90,90);
  --popup-button-text-color: #4285F4;
}

.c0[data-darkmode='true'] {
  --popup-background-color: rgba(123,123,123,0.8);
  --popup-shadow-color: rgba(123,123,123,0.42);
  --popup-text-color: rgb(218,218,218);
  --popup-button-text-color: #1bb6ff;
}

.c0 button {
  color: var(--popup-button-text-color);
}

.c0[data-slide-from="left"] {
  right: 24px;
  width: calc(100% - 24px);
}

.c0[data-slide-from="right"] {
  left: 24px;
  width: calc(100% - 24px);
}

<div>
  <div
    class="c0"
  />
</div>
`);
});

// describe('Props change style correctly', () => {
//   test('testProp', () => {
//     render(<DivPopup testProp data-testid="DivPopup" />);
//     expect(screen.getByTestId('DivPopup')).toHaveStyle(
//       `display: block`,
//     );
//   });
// });
