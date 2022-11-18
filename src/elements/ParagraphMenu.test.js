import {render} from '@testing-library/react';

import {ParagraphMenu} from './ParagraphMenu';

describe('ParagraphMenu component', () => {
  test('renders the UI correctly', () => {
    const {container} = render(<ParagraphMenu />);
    expect(container).toMatchInlineSnapshot(`
.c0 {
  padding: 4px 0;
}

<div>
  <p
    class="c0"
  />
</div>
`);
  });
});
