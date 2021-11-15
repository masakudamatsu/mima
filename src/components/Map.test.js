import {render} from '@testing-library/react';
import {axe} from 'jest-axe';

import {Map} from './Map';

const mockProps = {
  setMapObject: jest.fn().mockName('setMapObject'),
};

// Mock Visual Viewport API
Object.defineProperty(window, 'visualViewport', {
  writable: true,
  configurable: true,
  value: {height: 680, width: 320},
});

// We need to figure out how to mock Google Maps JS API
test.skip('is accessible', async () => {
  const {container} = render(<Map {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
