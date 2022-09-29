import {render} from '@testing-library/react';

import {DivCloud} from './DivCloud';

describe('DivCloud component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(<DivCloud />);
    expect(container).toMatchInlineSnapshot(`
.c0 {
  --blur-radius: 8px;
  background-color: var(--popup-background-color-fallback);
  font-family: 'Noto Sans',Verdana,sans-serif;
  font-size: 1.0506rem;
  font-weight: 400;
  line-height: 1.25;
  color: var(--popup-text-color);
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;
}

.c0 a {
  color: var(--link-text-color);
}

.c0[data-delete="true"] {
  z-index: 4;
}

@supports (-webkit-backdrop-filter:blur(var(--blur-radius))) or (backdrop-filter:blur(var(--blur-radius))) {
  .c0 {
    background-color: var(--popup-background-color);
    -webkit-backdrop-filter: blur(var(--blur-radius));
    backdrop-filter: blur(var(--blur-radius));
  }
}

@supports (background-image:-moz-element(#map)) and (not (backdrop-filter:blur(var(--blur-radius)))) {
  .c0 {
    background-color: transparent;
  }

  .c0::before {
    background-attachment: fixed;
    background-image: -moz-element(#map);
    content: "";
    -webkit-filter: blur(var(--blur-radius));
    filter: blur(var(--blur-radius));
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -2;
  }

  .c0::after {
    background-color: var(--popup-background-color);
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
});
