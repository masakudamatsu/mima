import {render} from '@testing-library/react';

import {ListAutocomplete} from './ListAutocomplete';

describe('ListAutocomplete component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(<ListAutocomplete />);
    expect(container).toMatchInlineSnapshot(`
.c0 {
  left: 8px;
  position: absolute;
  right: 8px;
  top: calc(48px + 2 * 2px + 48px + 8px);
  font-family: 'Noto Sans',Verdana,sans-serif;
  font-size: 1rem;
}

.c0 li {
  height: 48px;
}

.c0 li:not(:first-of-type) {
  margin-top: 8px;
}

.c0 li {
  background-color: rgba(255,255,255,0.93);
}

.c0 li dl {
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: grid;
  grid-column-gap: 8px;
  grid-template-columns: 16px 1fr;
  grid-template-rows: 50% 50%;
  padding: 0 8px;
}

.c0 li dl dd[data-dd-type="icon"] {
  grid-column: 1 / span 1;
  grid-row: 1 / span 2;
}

.c0 li dl dt {
  grid-column: 2 / span 1;
  grid-row: 1 / span 1;
}

.c0 li dl dd[data-dd-type="address"] {
  grid-column: 2 / span 1;
  grid-row: 2 / span 1;
}

.c0 li dl dt,
.c0 li dl dd[data-dd-type="address"] {
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.c0 b {
  font-family: 'Noto Sans Display',Georgia,sans-serif;
  font-weight: 700;
}

<div>
  <ul
    class="c0"
  />
</div>
`);
  });
});
