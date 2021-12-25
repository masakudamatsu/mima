// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

import {SearchedPlace} from './SearchedPlace';
import {mockGetDetails, mockPlacesApi} from 'src/utils/mockFunfctions';
const mockProps = {};

beforeEach(() => {
  mockPlacesApi();
});
test('calls getDetails() with place ID and non-empty list of fields when a place ID is provided', () => {
  const placeId = 'ChIJfwxa4v-pAWARQ-R4_cVAgAc';
  render(<SearchedPlace {...mockProps} />);

  expect(mockGetDetails).toBeCalledTimes(1);

  const placeIdRequested = mockGetDetails.mock.calls[0][0].placeId;
  expect(placeIdRequested).toBe(placeId);

  const fieldsRequested = mockGetDetails.mock.calls[0][0].fields;
  expect(fieldsRequested.length).not.toBe(0); // if 0, Google Maps API charges the highest price for getting place details
});

test('Accessibility checks', async () => {
  const {container} = render(<SearchedPlace {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
