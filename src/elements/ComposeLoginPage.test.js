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
  box-shadow: 0px 0px var(--blur-radius) var(--blur-radius) var(--popup-glow-color-fallback);
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
.c0 header + main {
  margin-top: 48px;
}

.c0 form h2 + p,
.c0 main h2 + p {
  margin-top: 24px;
}

.c0 form p + p,
.c0 main p + p {
  margin-top: 12px;
}

.c0 p + button,
.c0 p + a {
  margin-top: 24px;
}

.c0 a + a,
.c0 button + a,
.c0 a + button,
.c0 button + button {
  margin-top: 24px;
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

.c0 a[data-button-purpose="signup"],
.c0 button[data-button-purpose="signup"] {
  background-color: var(--dialog-button-color);
  color: var(--primary-button-text-color);
  width: 100%;
}

.c0 form,
.c0 header,
.c0 main {
  max-width: 495px;
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
    box-shadow: 0px 0px var(--blur-radius) var(--blur-radius) var(--popup-glow-color);
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
  }
}

@supports (-webkit-backdrop-filter:blur(var(--blur-radius))) or (backdrop-filter:blur(var(--blur-radius))) {
  .c0 {
    box-shadow: 0px 0px var(--blur-radius) var(--blur-radius) var(--popup-glow-color);
  }
}

@supports (background-image:-moz-element(#map)) and (not (backdrop-filter:blur(var(--blur-radius)))) {
  .c0 {
    box-shadow: none;
  }

  .c0::after {
    box-shadow: 0px 0px var(--blur-radius) var(--blur-radius) var(--popup-glow-color);
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
