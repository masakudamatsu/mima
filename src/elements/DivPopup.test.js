// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';

import {DivPopup} from './DivPopup';

const mockProps = {};

test('renders UI correctly', () => {
  const {container} = render(<DivPopup {...mockProps} />);
  expect(container).toMatchInlineSnapshot(`
.c0 {
  position: absolute;
  z-index: 3;
  font-family: 'Noto Sans',Verdana,sans-serif;
  font-size: 1.0506rem;
  font-weight: 400;
  line-height: 1.25;
  color: var(--popup-text-color);
  height: calc(100% - 24px);
  top: 24px;
  background: var(--popup-background-color);
  box-shadow: 0 0 16px 16px var(--popup-shadow-color),0 0 24px 16px var(--popup-shadow-color),0 0 32px 16px var(--popup-shadow-color);
}

.c0[data-slide-from="left"] {
  right: 24px;
  width: calc(100% - 24px);
}

.c0[data-slide-from="right"] {
  left: 24px;
  width: calc(100% - 24px);
}

.c0[data-slide-from="bottom"] {
  left: 24px;
  right: 24px;
  width: calc(100% - 48px);
}

.c0[data-height="one-third"] {
  height: 34%;
  top: 66%;
}

.c0[data-slide-from="left"] {
  -webkit-transform: translateX(-100%);
  -ms-transform: translateX(-100%);
  transform: translateX(-100%);
}

.c0[data-slide-from="right"] {
  -webkit-transform: translateX(100%);
  -ms-transform: translateX(100%);
  transform: translateX(100%);
}

.c0[data-slide-from="bottom"] {
  -webkit-transform: translateY(100%);
  -ms-transform: translateY(100%);
  transform: translateY(100%);
}

.c0[data-hidden='true'] {
  opacity: 0;
  -webkit-transition: opacity 400ms linear, -webkit-transform 400ms cubic-bezier(0.4,0.0,1,1);
  -webkit-transition: opacity 400ms linear, transform 400ms cubic-bezier(0.4,0.0,1,1);
  transition: opacity 400ms linear, transform 400ms cubic-bezier(0.4,0.0,1,1);
}

.c0[data-hidden='false'] {
  opacity: 1;
  -webkit-transform: none;
  -ms-transform: none;
  transform: none;
  -webkit-transition: opcacity 100ms linear, -webkit-transform 450ms cubic-bezier(0.0,0.0,0.2,1);
  -webkit-transition: opcacity 100ms linear, transform 450ms cubic-bezier(0.0,0.0,0.2,1);
  transition: opcacity 100ms linear, transform 450ms cubic-bezier(0.0,0.0,0.2,1);
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
