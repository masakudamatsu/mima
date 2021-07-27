import React from 'react';
import {render} from '@testing-library/react';

import VisuallyHidden from './VisuallyHidden';

test('renders UI correctly', () => {
  const {container} = render(<VisuallyHidden />);
  expect(container).toMatchInlineSnapshot(`
    .c0 {
      -webkit-clip: rect(1px 1px 1px 1px);
      clip: rect(1px 1px 1px 1px);
      -webkit-clip: rect(1px,1px,1px,1px);
      clip: rect(1px,1px,1px,1px);
      -webkit-clip-path: inset(50%);
      clip-path: inset(50%);
      height: 1px;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }

    <div>
      <h1
        class="c0"
      />
    </div>
  `);
});
