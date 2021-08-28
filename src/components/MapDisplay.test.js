import {render} from '@testing-library/react';
import {axe} from 'jest-axe';

import MapDisplay from './MapDisplay';

const mockProps = {
  setMapObject: jest.fn(),
};

test('is accessible', async () => {
  const {container} = render(<MapDisplay {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
