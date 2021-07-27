import {render} from '@testing-library/react';

import DivMap from './DivMap';

test('renders UI correctly', () => {
  const {container} = render(<DivMap />);
  expect(container).toMatchInlineSnapshot(`
    .c0 {
      height: 100%;
    }

    <div>
      <div
        class="c0"
      />
    </div>
  `);
});
