// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';

import {HeaderEditor} from './HeaderEditor';

const mockProps = {};

test('renders UI correctly', () => {
  const {container} = render(<HeaderEditor {...mockProps} />);
  expect(container).toMatchInlineSnapshot(`
.c0 {
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-bottom: 1px solid var(--button-outline-color);
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 100%;
}

.c0 button {
  height: 48px;
  text-transform: uppercase;
  width: 72px;
}

.c0 button:focus {
  border: 1px solid var(--button-outline-color-focus);
  border-radius: 8px;
  box-shadow: 0px 0px var(--button-shadow-blur-radius-focus) var(--button-shadow-color-focus);
}

.c0 button[data-save] {
  color: var(--dialog-button-color);
}

@media screen and (min-width:380px) {
  .c0 button {
    width: 96px;
  }
}

<div>
  <header
    class="c0"
  />
</div>
`);
});

// describe('Props change style correctly', () => {
//   test('testProp', () => {
//     render(<HeaderEditor testProp data-testid="HeaderEditor" />);
//     expect(screen.getByTestId('HeaderEditor')).toHaveStyle(
//       `display: block`,
//     );
//   });
// });
