import {render} from '@testing-library/react';

import {DivModalBackdrop} from './DivModalBackdrop';

describe('DivModalBackdrop component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(<DivModalBackdrop />);
    expect(container).toMatchInlineSnapshot(`
.c0 {
  background-color: rgba(0,0,0,0.7);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 4;
}

<div>
  <div
    class="c0"
  />
</div>
`);
  });
});
