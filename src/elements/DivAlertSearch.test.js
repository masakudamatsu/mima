import {render} from '@testing-library/react';

import {DivAlertSearch} from './DivAlertSearch';

describe('DivAlertSearch component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(<DivAlertSearch />);
    expect(container).toMatchInlineSnapshot(`
.c0 {
  --height: 96px;
  --border-radius: calc(48px / 2);
  --margin-side: calc(var(--border-radius));
  max-width: 561px;
}

.c0 p {
  border-radius: var(--border-radius);
  height: var(--height);
}

.c0 p {
  margin-top: 8px;
}

.c0 p {
  color: var(--popup-text-color);
  --blur-radius: 8px;
  background-color: var(--popup-background-color-fallback);
}

.c0 p {
  font-family: 'Noto Sans',Verdana,sans-serif;
  font-size: 1rem;
  padding: var(--margin-side);
}

@supports (-webkit-backdrop-filter:blur(var(--blur-radius))) or (backdrop-filter:blur(var(--blur-radius))) {
  .c0 p {
    background-color: var(--popup-background-color);
    -webkit-backdrop-filter: blur(var(--blur-radius));
    backdrop-filter: blur(var(--blur-radius));
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