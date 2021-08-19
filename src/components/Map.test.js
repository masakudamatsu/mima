import {render} from '@testing-library/react';
import {axe} from 'jest-axe';

import Map from './Map';

test('is accessible', async () => {
  const {container} = render(<Map />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
