import {render} from '@testing-library/react';

import {H1Logo} from './H1Logo';

describe('H1Logo component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(<H1Logo />);
    expect(container).toMatchInlineSnapshot(`
.c0 {
  font-family: 'Josefin Slab',serif;
  font-weight: 500;
  --min-viewport-width: 320;
  --current-viewport-width: clamp(320px,100vw,561px);
  --min-font-size: 36;
  font-size: calc(var(--min-font-size) * var(--current-viewport-width) / var(--min-viewport-width));
  color: var(--popup-text-color);
  word-spacing: -0.25em;
}

<div>
  <h1
    class="c0"
  />
</div>
`);
  });
});
