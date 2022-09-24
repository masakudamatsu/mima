// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';

import {SearchedPlace} from './SearchedPlace';

import {PlaceIdProvider} from 'src/wrappers/PlaceIdContext';
import {Places} from 'src/components/Places';
import {mockGetDetails, mockPlacesApi} from 'src/utils/mockFunfctions';

const mockProps = {};

function renderWithProviders(ui, {initialPlaceId = '', ...options} = {}) {
  const Wrapper = ({children}) => (
    <PlaceIdProvider initialPlaceId={initialPlaceId}>
      <Places>{children}</Places>
    </PlaceIdProvider>
  );
  return render(ui, {wrapper: Wrapper, ...options});
}

beforeEach(() => {
  mockPlacesApi();
  Object.defineProperty(window, 'visualViewport', {
    writable: true,
    configurable: true,
    value: {height: 700, width: 320},
  });
});

test('does not call getDetails() when no place ID is provided', () => {
  renderWithProviders(<SearchedPlace {...mockProps} />, {initialPlaceId: ''});
  screen.debug();
  expect(mockGetDetails).toBeCalledTimes(0);
});

test.only('renders nothing when no place ID is provided', () => {
  const {container} = renderWithProviders(<SearchedPlace {...mockProps} />, {
    initialPlaceId: '',
  });
  expect(container).toBeEmptyDOMElement();
});

test('calls getDetails() with place ID and non-empty list of fields when a place ID is provided', () => {
  const mockPlaceId = 'ChIJfwxa4v-pAWARQ-R4_cVAgAc';
  renderWithProviders(<SearchedPlace {...mockProps} />, {
    initialPlaceId: mockPlaceId,
  });

  expect(mockGetDetails).toBeCalledTimes(1);

  const placeIdRequested = mockGetDetails.mock.calls[0][0].placeId;
  expect(placeIdRequested).toBe(mockPlaceId);

  const fieldsRequested = mockGetDetails.mock.calls[0][0].fields;
  expect(fieldsRequested.length).not.toBe(0); // if 0, Google Maps API charges the highest price for getting place details
});

test('Accessibility checks', async () => {
  const {container} = renderWithProviders(<SearchedPlace {...mockProps} />, {
    initialPlaceId: '',
  });
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
