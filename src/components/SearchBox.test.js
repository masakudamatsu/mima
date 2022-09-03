// eslint-disable-next-line no-unused-vars
import {render as rtlRender, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {axe} from 'jest-axe';

import {SearchBox} from './SearchBox';
import {searchBoxLabel} from 'src/utils/uiCopies';

import {PlaceIdProvider} from 'src/wrappers/PlaceIdContext';
import {mockGetPlacePredictions, mockPlacesApi} from 'src/utils/mockFunfctions';

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
  expect(searchbox).toHaveAttribute('aria-expanded', 'false');
  expect(popuplist).toHaveAttribute('role', 'listbox');

  userEvent.type(searchbox, 'a');
  expect(searchbox).toHaveAttribute('aria-expanded', 'true');
  //   // TODO: mock google maps api so mock list items will be shown
  //   const firstItem = screen.getByRole('option', {name: 'Suggestion 1'});
  //   const firstItemId = 'downshift-0-item-0';
  //   expect(firstItem).toHaveAttribute('id', firstItemId);
  //   expect(firstItem).toHaveAttribute('aria-selected', 'false');

  //   userEvent.type(searchbox, '{arrowdown}');
  //   expect(searchbox).toHaveAttribute('aria-activedescendant', firstItemId);
  //   expect(firstItem).toHaveAttribute('aria-selected', 'true');
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
