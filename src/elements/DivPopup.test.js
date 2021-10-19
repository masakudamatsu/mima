// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';

import DivPopup from './DivPopup';

const mockProps = {};

test('renders UI correctly', () => {
  const {container} = render(<DivPopup {...mockProps} />);
  expect(container).toMatchInlineSnapshot(`
.c0 {
  position: absolute;
  z-index: 3;
  background: var(--popup-background-color);
  box-shadow: 0 0 16px 16px var(--popup-shadow-color),0 0 24px 16px var(--popup-shadow-color),0 0 32px 16px var(--popup-shadow-color);
  height: calc(100% - 48px);
  text-align: center;
  top: 24px;
  left: 24px;
  right: 24px;
  bottom: 24px;
  width: calc(100% - 48px);
}

.c0[data-darkmode='false'] {
  --popup-background-color: rgba(255,255,255,0.93);
  --popup-shadow-color: rgba(255,255,255,0.63);
}

.c0[data-darkmode='true'] {
  --popup-background-color: rgba(123,123,123,0.8);
  --popup-shadow-color: rgba(123,123,123,0.42);
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
