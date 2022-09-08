// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';

import {ButtonCircle} from './ButtonCircle';

describe('ButtonCircle component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(<ButtonCircle />);
    expect(container).toMatchInlineSnapshot(`
.c0 {
  background-color: rgba(255,255,255,0);
  border: none;
  border-radius: 50%;
  height: 48px;
  width: 48px;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 4;
  overflow: hidden;
}

.c0 svg {
  fill: var(--button-label-color-default);
  height: 36px;
  width: 36px;
}

.c0:focus {
  border-width: 1px;
  border-style: solid;
  border-color: var(--button-shadow-color-focus);
  box-shadow: 0px 0px var(--button-shadow-blur-radius-focus) var(--button-shadow-color-focus);
  outline: 1px solid transparent;
}

.c0:focus svg {
  fill: var(--button-label-color-focus);
}

.c0:focus:not(:focus-visible) {
  border-style: none;
  box-shadow: none;
}

.c0:focus:not(:focus-visible) svg {
  fill: var(--button-label-color-default);
}

.c0 .ripple {
  -webkit-animation: ePEfzm 600ms linear;
  animation: ePEfzm 600ms linear;
  background-color: var(--ripple-color);
  border-radius: 50%;
  position: absolute;
  -webkit-transform: scale(0);
  -ms-transform: scale(0);
  transform: scale(0);
}

<div>
  <button
    class="c0"
  />
</div>
`);
  });
});
