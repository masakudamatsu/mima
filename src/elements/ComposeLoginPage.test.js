import {render} from '@testing-library/react';

import {ComposeLoginPage} from './ComposeLoginPage';

describe('ComposeLoginPage component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(<ComposeLoginPage />);
    expect(container).toMatchInlineSnapshot(`
.c0 {
  height: 100%;
  --blur-radius: 8px;
  background-color: var(--popup-background-color-fallback);
  padding: 48px;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  color: var(--popup-text-color);
  font-family: 'Noto Sans',Verdana,sans-serif;
  font-size: 1.0506rem;
  font-weight: 400;
  line-height: 1.25;
}

.c0 header + form,
.c0 header + div[role="dialog"],
.c0 header + div[role="alertdialog"] {
  margin-top: 48px;
}

.c0 div[role="dialog"] h2 + div,
.c0 div[role="alertdialog"] h2 + div {
  margin-top: 24px;
}

.c0 div[role="dialog"] p + p,
.c0 div[role="alertdialog"] p + p {
  margin-top: 12px;
}

.c0 div[role="dialog"] div + button,
.c0 div[role="alertdialog"] div + div {
  margin-top: 24px;
}

.c0 button + button {
  margin-left: 8px;
}

.c0 a {
  color: var(--link-text-color);
}

.c0 h2 {
  font-family: 'Noto Sans Display',Georgia,sans-serif;
  font-size: 1.3986rem;
  font-weight: 700;
  line-height: 1.092;
}

.c0 div[role="dialog"] {
  max-width: 561px;
  width: 100%;
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
