import {render} from '@testing-library/react';

import {SpanRipple} from './SpanRipple';

describe('SpanRipple component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(<SpanRipple />);
    expect(container).toMatchInlineSnapshot(`
.c0 {
  border-radius: 50%;
  position: absolute;
  -webkit-animation-duration: 300ms;
  animation-duration: 300ms;
  -webkit-animation-fill-mode: backwards;
  animation-fill-mode: backwards;
  -webkit-animation-name: iGLmwX;
  animation-name: iGLmwX;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
}

@media (prefers-reduced-motion:reduce) {
  .c0 {
    -webkit-animation-duration: 250ms;
    animation-duration: 250ms;
    -webkit-animation-name: none;
    animation-name: none;
    -webkit-transform: scale(0);
    -ms-transform: scale(0);
    transform: scale(0);
  }
}

<div>
  <span
    class="c0"
  />
</div>
`);
  });
});
