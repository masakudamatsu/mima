import {render} from '@testing-library/react';

import {DivAlertSearch} from './DivAlertSearch';

describe('DivAlertSearch component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(<DivAlertSearch />);
    expect(container).toMatchInlineSnapshot(`
.c0 {
  color: var(--popup-text-color);
  font-family: 'Noto Sans',Verdana,sans-serif;
  font-size: 1rem;
  --border-radius: calc(48px / 2);
  --margin-side: calc(var(--border-radius));
  max-width: 561px;
}

.c0 p {
  padding: var(--margin-side);
}

<div>
  <div
    class="c0"
  />
</div>
`);
  });
});
