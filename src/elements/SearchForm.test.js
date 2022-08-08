import {render} from '@testing-library/react';

import {SearchForm} from './SearchForm';

describe('SearchForm component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(<SearchForm />);
    expect(container).toMatchInlineSnapshot(`
.c0[data-searchbox='true'],
.c0[data-searchbox='closing'] {
  position: absolute;
  z-index: 2;
  --blur-radius: 8px;
  background-color: var(--popup-background-color-fallback);
  height: 100%;
  width: 100%;
  -webkit-animation-duration: 300ms;
  animation-duration: 300ms;
  -webkit-animation-fill-mode: backwards;
  animation-fill-mode: backwards;
  -webkit-animation-name: jBcSpD;
  animation-name: jBcSpD;
  -webkit-animation-timing-fiunction: linear;
  animation-timing-fiunction: linear;
}

.c0[data-searchbox='closing'] {
  -webkit-animation-duration: 250ms;
  animation-duration: 250ms;
  -webkit-animation-name: jiroXv;
  animation-name: jiroXv;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}

@supports (-webkit-backdrop-filter:blur(var(--blur-radius))) or (backdrop-filter:blur(var(--blur-radius))) {
  .c0[data-searchbox='true'],
  .c0[data-searchbox='closing'] {
    background-color: var(--popup-background-color);
    -webkit-backdrop-filter: blur(var(--blur-radius));
    backdrop-filter: blur(var(--blur-radius));
  }
}

@supports (background-image:-moz-element(#map)) and (not (backdrop-filter:blur(var(--blur-radius)))) {
  .c0[data-searchbox='true'],
  .c0[data-searchbox='closing'] {
    background-color: transparent;
  }

  .c0[data-searchbox='true']::before,
  .c0[data-searchbox='closing']::before {
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

  .c0[data-searchbox='true']::after,
  .c0[data-searchbox='closing']::after {
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
  <form
    class="c0"
    role="search"
  />
</div>
`);
  });
});
