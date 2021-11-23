// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';

import {DivParagraphHolder} from './DivParagraphHolder';

const mockProps = {};

test('renders UI correctly', () => {
  const {container} = render(<DivParagraphHolder {...mockProps} />);
  expect(container).toMatchInlineSnapshot(`
.c0 p:first-of-type {
  margin-top: -0.2836rem;
}

.c0 p + p {
  margin-top: 0.4965rem;
}

.c0 p:last-of-type {
  margin-bottom: 0.7801rem;
}

<div>
  <div
    class="c0"
  />
</div>
`);
});
