import {render} from '@testing-library/react';

import {ParagraphLoading} from './ParagraphLoading';

describe('ParagraphLoading component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(<ParagraphLoading />);
    expect(container).toMatchInlineSnapshot(`
.c0 {
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 100%;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 100%;
  position: absolute;
  z-index: 3;
  -webkit-animation: bPkxfw 1500ms linear infinite;
  animation: bPkxfw 1500ms linear infinite;
}

<div>
  <p
    class="c0"
  />
</div>
`);
  });
});
