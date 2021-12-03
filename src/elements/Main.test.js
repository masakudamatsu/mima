import {render} from '@testing-library/react';

import {Main} from './Main';

test('renders UI correctly', () => {
  const {container} = render(<Main />);
  expect(container).toMatchInlineSnapshot(`
.c0 {
  height: 100%;
  isolation: isolate;
}

<div>
  <main
    class="c0"
    id="map"
  />
</div>
`);
});
