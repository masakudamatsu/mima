import {render} from '@testing-library/react';

import {DivSearchBoxWrapper} from './DivSearchBoxWrapper';

describe('DivSearchBoxWrapper component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(<DivSearchBoxWrapper />);
    expect(container).toMatchInlineSnapshot(`
.c0 {
  height: calc(2 * 2px + 48px);
  max-width: 584px;
  left: 8px;
  margin: 0 auto;
  position: absolute;
  right: 8px;
  z-index: 3;
  top: 48px;
  border: 2px solid var(--button-label-color-default);
  border-radius: calc(48px / 2);
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding-right: 48px;
  padding-left: calc(48px / 2);
}

.c0:focus-within {
  border-color: var(--button-label-color-focus);
}

.c0 input[type='search'] {
  height: 100%;
  width: 100%;
}

<div>
  <div
    class="c0"
  />
</div>
`);
  });
});
