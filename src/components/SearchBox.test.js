// eslint-disable-next-line no-unused-vars
import {render as rtlRender, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {axe} from 'jest-axe';

import {SearchBox} from './SearchBox';
import {searchBoxLabel} from 'src/utils/uiCopies';

import {PlaceIdProvider} from 'src/wrappers/PlaceIdContext';
import {mockGetPlacePredictions, mockPlacesApi} from 'test/utils/mockFunctions';

function Wrapper({children}) {
  return <PlaceIdProvider>{children}</PlaceIdProvider>;
}
function render(ui, options) {
  return rtlRender(ui, {wrapper: Wrapper, ...options});
}

beforeEach(() => {
  mockPlacesApi();
});

const mockProps = {};

test(`complies ARIA 1.2 guideline`, () => {
  render(<SearchBox {...mockProps} />);
  const searchbox = screen.getByLabelText(searchBoxLabel.ariaLabel);
  const popuplist = screen.getByLabelText(searchBoxLabel.listbox);
  const popuplistId = 'downshift-0-menu';
  expect(popuplist).toHaveAttribute('id', popuplistId);

  expect(searchbox).toHaveAttribute('role', 'combobox');
  expect(searchbox).toHaveAttribute('aria-autocomplete', 'list');
  expect(searchbox).toHaveAttribute('aria-controls', popuplistId);
  expect(popuplist).toHaveAttribute('role', 'listbox');
});
test.skip(`The "aria-expanded" attribute toggles as the user enters text`, () => {
  // TODO: #414 Fix SearchBox.js so the following test passes.
  render(<SearchBox {...mockProps} />);
  const searchbox = screen.getByLabelText(searchBoxLabel.ariaLabel);
  expect(searchbox).toHaveAttribute('aria-expanded', 'false');
  userEvent.type(searchbox, 'a');
  expect(searchbox).toHaveAttribute('aria-expanded', 'true');
});
test.skip(`Autocomplete suggestions behave according to ARIA 1.2`, () => {
  // TODO: #204 mock google maps api so mock list items will be shown
  // setup
  render(<SearchBox {...mockProps} />);
  const searchbox = screen.getByLabelText(searchBoxLabel.ariaLabel);
  userEvent.type(searchbox, 'a');
  const firstItem = screen.getByRole('option', {name: 'Suggestion 1'});
  const firstItemId = 'downshift-0-item-0';

  // verify
  expect(firstItem).toHaveAttribute('id', firstItemId);
  expect(firstItem).toHaveAttribute('aria-selected', 'false');

  // execute
  userEvent.type(searchbox, '{arrowdown}');

  // verify
  expect(searchbox).toHaveAttribute('aria-activedescendant', firstItemId);
  expect(firstItem).toHaveAttribute('aria-selected', 'true');
});
test(`Input search element's inputmode attribute is set to be "search"`, () => {
  // To show mobile keyboards with the return key labelled "Go" in iOS or magnifying glass icon in Android;
  // See https://css-tricks.com/everything-you-ever-wanted-to-know-about-inputmode/
  render(<SearchBox {...mockProps} />);
  expect(screen.getByLabelText(searchBoxLabel.ariaLabel)).toHaveAttribute(
    'inputmode',
    'search',
  );
});

test('calls getPlacePredictions() each time typing a character in search box', () => {
  render(<SearchBox {...mockProps} />);
  const searchTerms = ['a', 'abc'];
  searchTerms.forEach(searchTerm => {
    userEvent.type(screen.getByLabelText(searchBoxLabel.ariaLabel), searchTerm);
    expect(mockGetPlacePredictions).toHaveBeenCalledTimes(searchTerm.length);
    mockGetPlacePredictions.mockClear();
  });
});

test('calls getPlacePredictions() with the same session token', () => {
  render(<SearchBox {...mockProps} />);

  // execute
  userEvent.type(screen.getByLabelText(searchBoxLabel.ariaLabel), 'o');
  userEvent.type(screen.getByLabelText(searchBoxLabel.ariaLabel), 'k');

  // verify
  const firstToken = mockGetPlacePredictions.mock.calls[0][0].sessionToken.Vl;
  const secondToken = mockGetPlacePredictions.mock.calls[1][0].sessionToken.Vl;
  expect(secondToken).toBe(firstToken);
});

describe(`shows relevant alert when Places API fails`, () => {
  // We skip testing the case of "ZERO_RESULTS" because Cypress can cover it
  test('INVALID_REQUEST', () => {
    mockGetPlacePredictions.mockImplementationOnce(
      ({input, sessionToken}, callback) => {
        const predictions = [];
        const status = 'INVALID_REQUEST';
        callback(predictions, status);
      },
    );
    const {container} = render(<SearchBox {...mockProps} />);
    userEvent.type(screen.getByLabelText(searchBoxLabel.ariaLabel), 'a');
    expect(container.querySelector('div[role="alert"] p'))
      .toMatchInlineSnapshot(`
      @supports (-webkit-backdrop-filter:blur(var(--blur-radius))) or (backdrop-filter:blur(var(--blur-radius))) {

      }

      <p>
        No place is found on the map. Try another search term.
      </p>
    `);
  });
  test('NOT_FOUND', () => {
    mockGetPlacePredictions.mockImplementationOnce(
      ({input, sessionToken}, callback) => {
        const predictions = [];
        const status = 'NOT_FOUND';
        callback(predictions, status);
      },
    );
    const {container} = render(<SearchBox {...mockProps} />);
    userEvent.type(screen.getByLabelText(searchBoxLabel.ariaLabel), 'a');
    expect(container.querySelector('div[role="alert"] p'))
      .toMatchInlineSnapshot(`
      @supports (-webkit-backdrop-filter:blur(var(--blur-radius))) or (backdrop-filter:blur(var(--blur-radius))) {

      }

      <p>
        No place is found on the map. Try another search term.
      </p>
    `);
  });
  test('OVER_QUERY_LIMIT', () => {
    mockGetPlacePredictions.mockImplementationOnce(
      ({input, sessionToken}, callback) => {
        const predictions = [];
        const status = 'OVER_QUERY_LIMIT';
        callback(predictions, status);
      },
    );
    const {container} = render(<SearchBox {...mockProps} />);
    userEvent.type(screen.getByLabelText(searchBoxLabel.ariaLabel), 'a');
    expect(container.querySelector('div[role="alert"] p'))
      .toMatchInlineSnapshot(`
      @supports (-webkit-backdrop-filter:blur(var(--blur-radius))) or (backdrop-filter:blur(var(--blur-radius))) {

      }

      <p>
        My Ideal Map is currently unable to use Google Maps search. Please contact us so we can fix the problem.
      </p>
    `);
  });
  test('REQUEST_DENIED', () => {
    mockGetPlacePredictions.mockImplementationOnce(
      ({input, sessionToken}, callback) => {
        const predictions = [];
        const status = 'REQUEST_DENIED';
        callback(predictions, status);
      },
    );
    const {container} = render(<SearchBox {...mockProps} />);
    userEvent.type(screen.getByLabelText(searchBoxLabel.ariaLabel), 'a');
    expect(container.querySelector('div[role="alert"] p'))
      .toMatchInlineSnapshot(`
      @supports (-webkit-backdrop-filter:blur(var(--blur-radius))) or (backdrop-filter:blur(var(--blur-radius))) {

      }

      <p>
        My Ideal Map is currently unable to use Google Maps search. Please contact us so we can fix the problem.
      </p>
    `);
  });
  test('UNKNOWN_ERROR', () => {
    mockGetPlacePredictions.mockImplementationOnce(
      ({input, sessionToken}, callback) => {
        const predictions = [];
        const status = 'UNKNOWN_ERROR';
        callback(predictions, status);
      },
    );
    const {container} = render(<SearchBox {...mockProps} />);
    userEvent.type(screen.getByLabelText(searchBoxLabel.ariaLabel), 'a');
    expect(container.querySelector('div[role="alert"] p'))
      .toMatchInlineSnapshot(`
      @supports (-webkit-backdrop-filter:blur(var(--blur-radius))) or (backdrop-filter:blur(var(--blur-radius))) {

      }

      <p>
         
        Google Maps server is currently down.
         
        <a
          href="https://status.cloud.google.com/maps-platform/products/i3CZYPyLB1zevsm2AV6M/history"
          rel="noreferrer"
          target="_blank"
        >
          Please check its status
        </a>
        , and try again once they fix the problem (usually within a few hours).
      </p>
    `);
  });
  test('Someone hacked Places API', () => {
    mockGetPlacePredictions.mockImplementationOnce(
      ({input, sessionToken}, callback) => {
        const predictions = [];
        const status = 'Someone hacked Places API';
        callback(predictions, status);
      },
    );
    const {container} = render(<SearchBox {...mockProps} />);
    userEvent.type(screen.getByLabelText(searchBoxLabel.ariaLabel), 'a');
    expect(container.querySelector('div[role="alert"] p'))
      .toMatchInlineSnapshot(`
      @supports (-webkit-backdrop-filter:blur(var(--blur-radius))) or (backdrop-filter:blur(var(--blur-radius))) {

      }

      <p>
         
        Google Maps server is currently down.
         
        <a
          href="https://status.cloud.google.com/maps-platform/products/i3CZYPyLB1zevsm2AV6M/history"
          rel="noreferrer"
          target="_blank"
        >
          Please check its status
        </a>
        , and try again once they fix the problem (usually within a few hours).
      </p>
    `);
  });
  test('When there is an error, deleting search text will hide the error message', () => {
    mockGetPlacePredictions.mockImplementationOnce(
      ({input, sessionToken}, callback) => {
        const predictions = [];
        const status = 'Someone hacked Places API';
        callback(predictions, status);
      },
    );
    render(<SearchBox {...mockProps} />);
    // Execute
    userEvent.type(screen.getByLabelText(searchBoxLabel.ariaLabel), 'a');
    userEvent.type(
      screen.getByLabelText(searchBoxLabel.ariaLabel),
      '{backspace}',
    );
    // Verify
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
test('Accessibility checks', async () => {
  // disable warning in console; see https://github.com/nickcolley/jest-axe/issues/147#issuecomment-758804533
  const {getComputedStyle} = window;
  window.getComputedStyle = elt => getComputedStyle(elt);

  const {container} = render(<SearchBox {...mockProps} />);
  const results = await axe(container, {
    rules: {
      tabindex: {enabled: false},
      // react-focus-lock uses tabindex=1, which violates "Elements should not have tabindex greater than zero (tabindex)"
      // for detail on the rule, see https://dequeuniversity.com/rules/axe/4.1/tabindex?application=axeAPI
    },
  });
  expect(results).toHaveNoViolations();
});
