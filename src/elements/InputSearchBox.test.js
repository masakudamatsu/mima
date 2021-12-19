import {render} from '@testing-library/react';

import {InputSearchBox} from './InputSearchBox';

describe('InputSearchBox component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(<InputSearchBox />);
    expect(container).toMatchInlineSnapshot(`
.c0 {
  -moz-appearance: none;
  -webkit-appearance: none;
  -webkit-box-sizing: content-box;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  color: rgba(0,0,0,0.87);
  font-family: 'Noto Sans',Verdana,sans-serif;
  font-size: 1rem;
}

.c0::-webkit-search-decoration,
.c0::-webkit-search-cancel-button,
.c0::-webkit-search-results-button,
.c0::-webkit-search-results-decoration {
  display: none;
}

<div>
  <input
    class="c0"
  />
</div>
`);
  });
});
