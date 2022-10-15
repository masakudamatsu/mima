import {render} from '@testing-library/react';

import {DivLoginPageBackground} from './DivLoginPageBackground';

describe('DivLoginPageBackground component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(<DivLoginPageBackground />);
    expect(container).toMatchInlineSnapshot(`
.c0 {
  background-attachment: fixed;
  background-image: var(--login-background-image-url);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}

<div>
  <div
    class="c0"
  />
</div>
`);
  });
});
