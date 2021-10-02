import {render} from '@testing-library/react';
import {axe} from 'jest-axe';

import Map from './Map';

const mockProps = {
  setMapObject: jest.fn().mockName('setMapObject'),
};

test('is accessible', async () => {
  const {container} = render(<Map {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
