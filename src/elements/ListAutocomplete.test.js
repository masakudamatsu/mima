import {render} from '@testing-library/react';

import {ListAutocomplete} from './ListAutocomplete';

describe('ListAutocomplete component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(<ListAutocomplete />);
    expect(container).toMatchInlineSnapshot(`
.c0 {
  --height: 48px;
  --border-radius: calc(var(--height) / 2);
  --margin-left: calc(var(--border-radius) / 2);
  --margin-right: calc(var(--border-radius));
  --icon-size: 36px;
  --icon-vertical-margin: calc( ( var(--height) - var(--icon-size) ) / 2 );
  max-width: 561px;
  font-family: 'Noto Sans',Verdana,sans-serif;
  font-size: 1rem;
}

.c0 li {
  border-radius: var(--border-radius);
  height: var(--height);
  list-style: none;
}

.c0 li:not(:first-of-type) {
  margin-top: 8px;
}

.c0 li {
  color: var(--popup-text-color);
  --blur-radius: 8px;
  background-color: var(--popup-background-color-fallback);
}

.c0 li svg {
  fill: var(--popup-text-color);
}

.c0 li[data-highlighted="true"] {
  background-color: var(--popup-background-highlighted);
}

.c0 li {
  padding-right: var(--margin-right);
}

.c0 li dl {
  height: 100%;
  position: relative;
}

.c0 li dl dd[data-dd-type="icon"] {
  height: 100%;
  position: absolute;
  left: var(--margin-left);
  top: var(--icon-vertical-margin);
  bottom: var(--icon-vertical-margin);
}

.c0 li dl dd[data-dd-type="icon"] svg {
  height: var(--icon-size);
  width: var(--icon-size);
}

.c0 li dl dt,
.c0 li dl dd[data-dd-type="address"] {
  position: absolute;
  left: calc( var(--margin-left) + var(--icon-size) + 5px);
}

.c0 li dl dt {
  top: 0;
}

.c0 li dl dd[data-dd-type="address"] {
  top: 50%;
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

.c0 li {
  position: relative;
  overflow: hidden;
}

.c0 li .ripple {
  -webkit-animation: iHfQSf 300ms linear;
  animation: iHfQSf 300ms linear;
  background-color: var(--ripple-color);
  border-radius: 50%;
  position: absolute;
  -webkit-transform: scale(0);
  -ms-transform: scale(0);
  transform: scale(0);
}

@supports (-webkit-backdrop-filter:blur(var(--blur-radius))) or (backdrop-filter:blur(var(--blur-radius))) {
  .c0 li {
    background-color: var(--popup-background-color);
    -webkit-backdrop-filter: blur(var(--blur-radius));
    backdrop-filter: blur(var(--blur-radius));
  }
}

<div>
  <ul
    class="c0"
  />
</div>
`);
  });
});
