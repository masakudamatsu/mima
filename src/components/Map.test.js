import {render} from '@testing-library/react';
import {axe} from 'jest-axe';

import {Map} from './Map';

beforeEach(() => {
  global.google = {
    maps: {
      Map: jest.fn(),
    },
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

const mockProps = {
  setMapObject: jest.fn().mockName('setMapObject'),
};

test('calls setMapObject when rendered', () => {
  render(<Map {...mockProps} />);
  expect(mockProps.setMapObject).toHaveBeenCalledTimes(1);
});
test('is accessible', async () => {
  const {container} = render(<Map {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
