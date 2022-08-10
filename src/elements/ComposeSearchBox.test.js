import {render} from '@testing-library/react';

import {ComposeSearchBox} from './ComposeSearchBox';

describe('ComposeSearchBox component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(<ComposeSearchBox />);
    expect(container).toMatchInlineSnapshot(`
.c0 {
  --box-height: 48px;
  --border-radius: calc(var(--box-height) / 2);
  --border-width: 2px;
  --icon-size: 36px;
  --icon-left-margin: calc(var(--border-radius) / 2);
  --icon-vertical-margin: calc( ( var(--box-height) - var(--icon-size) ) / 2 );
  height: var(--box-height);
  max-width: 561px;
  position: relative;
  left: 8px;
  margin: 0 auto;
  right: 8px;
  top: 48px;
  z-index: 3;
}

.c0 input[type="search"] {
  border: var(--border-width) solid var(--button-label-color-default);
  border-radius: var(--border-radius);
  height: 100%;
  width: 100%;
}

.c0 svg {
  height: var(--icon-size);
  width: var(--icon-size);
  position: absolute;
  left: var(--icon-left-margin);
  top: var(--icon-vertical-margin);
  bottom: var(--icon-vertical-margin);
}

.c0 input[type="search"] {
  padding-left: calc( var(--icon-left-margin) + var(--icon-size) + 4px);
  padding-right: var(--border-radius);
}

.c0 svg {
  z-index: -1;
}

.c0 input[type="search"] {
  background: transparent;
}

.c0 input[type="search"] {
  color: var(--popup-text-color);
  font-family: 'Noto Sans',Verdana,sans-serif;
  font-size: 1rem;
}

.c0 input[type="search"]::-webkit-input-placeholder {
  color: var(--popup-text-color);
  opacity: 1;
}

.c0 input[type="search"]::-moz-placeholder {
  color: var(--popup-text-color);
  opacity: 1;
}

.c0 input[type="search"]:-ms-input-placeholder {
  color: var(--popup-text-color);
  opacity: 1;
}

.c0 input[type="search"]::placeholder {
  color: var(--popup-text-color);
  opacity: 1;
}

.c0 svg {
  fill: var(--button-label-color-default);
}

.c0 input[type="search"]:focus {
  border-color: var(--button-shadow-color-focus);
  box-shadow: 0px 0px var(--button-shadow-blur-radius-focus) var(--button-shadow-color-focus);
}

<div>
  <div
    class="c0"
  />
</div>
`);
  });
});
