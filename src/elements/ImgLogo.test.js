import {render} from '@testing-library/react';

import {ImgLogo} from './ImgLogo';

describe('ImgLogo component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(<ImgLogo />);
    expect(container).toMatchInlineSnapshot(`
.c0 {
  width: 100%;
}

<div>
  <img
    class="c0"
  />
</div>
`);
  });
});
