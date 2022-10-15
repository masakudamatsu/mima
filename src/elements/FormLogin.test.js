import {render} from '@testing-library/react';

import {FormLogin} from './FormLogin';

describe('FormLogin component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(<FormLogin />);
    expect(container).toMatchInlineSnapshot(`
.c0 {
  --input-field-height: 48px;
  --input-field-border-radius: calc(var(--input-field-height) / 2);
  max-width: 561px;
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  color: var(--popup-text-color);
  font-family: 'Noto Sans',Verdana,sans-serif;
}

.c0 button,
.c0 label {
  margin-left: var(--input-field-border-radius);
}

.c0 input[type="email"] {
  padding-left: var(--input-field-border-radius);
  padding-right: var(--input-field-border-radius);
}

.c0 button,
.c0 input[type="email"] {
  margin-top: 8px;
}

.c0 label {
  font-size: 1rem;
}

.c0 button {
  font-size: 1rem;
}

.c0 input[type="email"] {
  height: var(--input-field-height);
  border: 2px solid var(--button-label-color-default);
  border-radius: var(--input-field-border-radius);
  width: 100%;
}

.c0 input[type="email"] {
  -webkit-appearance: none;
  color: var(--popup-text-color);
  font-family: 'Noto Sans',Verdana,sans-serif;
  font-size: 1rem;
}

.c0 input[type="email"]::-webkit-input-placeholder {
  color: var(--popup-text-color);
  opacity: 0.5;
}

.c0 input[type="email"]::-moz-placeholder {
  color: var(--popup-text-color);
  opacity: 0.5;
}

.c0 input[type="email"]:-ms-input-placeholder {
  color: var(--popup-text-color);
  opacity: 0.5;
}

.c0 input[type="email"]::placeholder {
  color: var(--popup-text-color);
  opacity: 0.5;
}

.c0 input[type="email"]:focus {
  border-color: var(--button-shadow-color-focus);
  box-shadow: 0px 0px var(--button-shadow-blur-radius-focus) var(--button-shadow-color-focus);
  outline: 1px solid transparent;
}

<div>
  <form
    class="c0"
  />
</div>
`);
  });
});
