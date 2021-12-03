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
  padding: 0 10px 10px 10px;
  background-color: var(--popup-background-color-fallback);
  box-shadow: 0px 0px  8px 8px var(--popup-glow-color-fallback);
}

.c0 a {
  color: var(--link-text-color);
}

.c0 h1 + p {
  margin-top: -0.2836rem;
}

.c0 p + p {
  margin-top: 0.4965rem;
}

.c0 p + button {
  margin-top: 1.1112rem;
}

.c0[data-placedatapopup="true"] p + button {
  margin-top: 0.7801rem;
}

.c0[data-slide-from="left"] {
  height: 100%;
  right: 24px;
  top: 0;
  width: calc(100% - 24px);
}

.c0[data-slide-from="right"] {
  height: 100%;
  left: 24px;
  top: 0;
  width: calc(100% - 24px);
}

.c0[data-slide-from="bottom"] {
  height: 100%;
  left: 0;
  top: 0;
  width: 100%;
}

.c0[data-placedatapopup="true"] {
  height: 34%;
  left: 0;
  top: 66%;
  width: 100%;
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

@media screen and (min-width:540px) {
  .c0 {
    padding: 0 48px 48px 48px;
  }
}

@supports (-webkit-backdrop-filter:blur(8px)) or (backdrop-filter:blur(8px)) {
  .c0 {
    background-color: var(--popup-background-color);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    box-shadow: 0px 0px  8px 8px var(--popup-glow-color);
  }
}

@supports (background-image:-moz-element(#map)) and (not (backdrop-filter:blur(8px))) {
  .c0 {
    background-color: transparent;
    box-shadow: none;
  }

  .c0::before {
    background-attachment: fixed;
    background-image: -moz-element(#map);
    content: "";
    -webkit-filter: blur(8px);
    filter: blur(8px);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -2;
  }

  .c0::after {
    background-color: var(--popup-background-color);
    box-shadow: 0px 0px  8px 8px var(--popup-glow-color);
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
  }
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
