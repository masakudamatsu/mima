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
  color: var(--popup-text-color);
  font-family: 'Noto Sans',Verdana,sans-serif;
  font-size: 1rem;
}

.c0::-webkit-search-decoration,
.c0::-webkit-search-cancel-button,
.c0::-webkit-search-results-button,
.c0::-webkit-search-results-decoration {
  display: none;
}

.c0::-webkit-input-placeholder {
  color: var(--popup-text-color);
}

.c0::-moz-placeholder {
  color: var(--popup-text-color);
}

.c0:-ms-input-placeholder {
  color: var(--popup-text-color);
}

.c0::placeholder {
  color: var(--popup-text-color);
}

<div>
  <input
    class="c0"
  />
</div>
`);
  });
});
