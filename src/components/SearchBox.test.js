// eslint-disable-next-line no-unused-vars
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {axe} from 'jest-axe';

import {SearchBox} from './SearchBox';
import {searchBoxLabel} from 'src/utils/uiCopies';

const mockProps = {};

const mockGetPlacePredictions = jest.fn().mockName('getPlacePredictions');
function initialize() {
  global.google = {
    maps: {
      places: {
        AutocompleteService: jest.fn(() => {
          return {
            getPlacePredictions: mockGetPlacePredictions,
          };
        }),
      },
    },
  };
}

beforeEach(() => {
  initialize();
});
test(`Input search element's inputmode attribute is set to be "search"`, () => {
  // To show mobile keyboards with the return key labelled "Go" in iOS or magnifying glass icon in Android;
  // See https://css-tricks.com/everything-you-ever-wanted-to-know-about-inputmode/
  render(<SearchBox {...mockProps} />);
  expect(
    screen.getByLabelText(searchBoxLabel.ariaLabel, {selector: 'input'}),
  ).toHaveAttribute('inputmode', 'search');
});

test('calls getPlacePredictions() each time typing a character in search box', () => {
  render(<SearchBox {...mockProps} />);
  const searchTerms = ['a', 'abc'];
  searchTerms.forEach(searchTerm => {
    userEvent.type(
      screen.getByLabelText(searchBoxLabel.ariaLabel, {selector: 'input'}),
      searchTerm,
    );
    expect(mockGetPlacePredictions).toHaveBeenCalledTimes(searchTerm.length);
    mockGetPlacePredictions.mockClear();
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
