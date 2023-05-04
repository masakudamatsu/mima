import {render} from '@testing-library/react';

import {DivButtonsRow} from './DivButtonsRow';

describe('DivButtonsRow component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(<DivButtonsRow />);
    expect(container).toMatchInlineSnapshot(`
.c0 {
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

.c0 button + button,
.c0 a + button,
.c0 button + a,
.c0 a + a {
  margin-left: 8px;
}

<div>
  <div
    class="c0"
  />
</div>
`);
  });
});
