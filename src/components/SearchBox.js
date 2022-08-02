import {useContext, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import FocusLock from 'react-focus-lock';
import {useCombobox} from 'downshift';

import {CloseButton} from './CloseButton';

import {DivSearchBoxWrapper} from 'src/elements/DivSearchBoxWrapper';
import {InputSearchBox} from 'src/elements/InputSearchBox';
import {ListAutocomplete} from 'src/elements/ListAutocomplete';
import {SearchSubmitButton} from './SearchSubmitButton';
import {SvgPlace} from 'src/elements/SvgPlace';
import {VisuallyHidden} from 'src/elements/VisuallyHidden';

import {PlaceIdContext} from 'src/wrappers/PlaceIdContext';
import {autocomplete} from 'src/utils/designtokens';
import {searchBoxLabel} from 'src/utils/uiCopies';

import {boldSubstring} from 'src/utils/boldSubstring';
import {cleanAutocompleteData} from 'src/utils/cleanAutocompleteData';

export const SearchBox = ({handleClickCloseButton}) => {
  const [, setPlaceId] = useContext(PlaceIdContext);

  const google = window.google;
  const service = new google.maps.places.AutocompleteService();
  const sessionToken = useMemo(
    () => new google.maps.places.AutocompleteSessionToken(),
    [google.maps.places.AutocompleteSessionToken],
  );
  const [inputItems, setInputItems] = useState([]);
  const {
    getComboboxProps,
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    isOpen,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({inputValue}) => {
      service.getPlacePredictions(
        // returns place predictions. Note: A 'place' can be an establishment, geographic location, or prominent point of interest, as defined by the Places API.
        {
          input: inputValue,
          sessionToken: sessionToken,
          // TODO: Add more options to location-bias search to a particular area (issue #195)
        },
        (predictions, status) => {
          if (status !== 'OK' || !predictions) {
            // TODO: Handle error more properly (issue #196)
            console.error(
              'Google Maps Places Autocomplete API call has failed.',
            );
          }
          const autocompleteSuggestions = predictions.map(prediction => {
            const rawPlaceName = {
              autocompleteText: prediction.structured_formatting.main_text,
              length: prediction.structured_formatting
                .main_text_matched_substrings
                ? prediction.structured_formatting
                    .main_text_matched_substrings[0]['length']
                : 0,
              offset: prediction.structured_formatting
                .main_text_matched_substrings
                ? prediction.structured_formatting
                    .main_text_matched_substrings[0]['offset']
                : 0,
            };
            const rawAddressName = prediction.structured_formatting
              .secondary_text
              ? {
                  autocompleteText:
                    prediction.structured_formatting.secondary_text,
                  length: prediction.structured_formatting
                    .secondary_text_matched_substrings
                    ? prediction.structured_formatting
                        .secondary_text_matched_substrings[0]['length']
                    : 0,
                  offset: prediction.structured_formatting
                    .secondary_text_matched_substrings
                    ? prediction.structured_formatting
                        .secondary_text_matched_substrings[0]['offset']
                    : 0,
                }
              : {autocompleteText: null, length: null, offset: null};
            return {
              id: prediction.place_id,
              name: cleanAutocompleteData({inputValue, ...rawPlaceName}),
              address: cleanAutocompleteData({inputValue, ...rawAddressName}),
            };
          });
          setInputItems(autocompleteSuggestions);
        },
      );
    },
  });

  return (
    <FocusLock returnFocus>
      <CloseButton
        handleClick={handleClickCloseButton}
        testId="searchbox-last-focusable-element" // to test focus management
      />
      <DivSearchBoxWrapper {...getComboboxProps()}>
        <VisuallyHidden {...getLabelProps()} as="label">
          {searchBoxLabel.ariaLabel}
        </VisuallyHidden>
        <InputSearchBox
          {...getInputProps({
            autoFocus: true,
            'data-testid': 'searchbox-first-focusable-element', // to test focus management
            inputMode: 'search',
            placeholder: searchBoxLabel.placeholder,
            type: 'search',
          })}
        />{' '}
        <SearchSubmitButton />
      </DivSearchBoxWrapper>
      <ListAutocomplete {...getMenuProps()}>
        {isOpen
          ? inputItems.map((item, index) => {
              return (
                <li
                  key={item.id}
                  style={highlightedIndex === index ? autocomplete.focus : {}}
                  {...getItemProps({item, index})}
                  onClick={() => {
                    setPlaceId(item.id);
                    handleClickCloseButton();
                  }}
                >
                  <dl>
                    <dt
                      dangerouslySetInnerHTML={{
                        __html: boldSubstring(item.name),
                      }}
                    />
                    <dd
                      data-dd-type="address"
                      dangerouslySetInnerHTML={{
                        __html: item.address
                          ? boldSubstring(item.address)
                          : null,
                      }}
                    />
                    <dd data-dd-type="icon">
                      <SvgPlace />
                      <VisuallyHidden as="span">
                        Found in Google Maps
                      </VisuallyHidden>
                    </dd>
                  </dl>
                </li>
              );
            })
          : null}
      </ListAutocomplete>
    </FocusLock>
  );
};

SearchBox.propTypes = {
  handleClickCloseButton: PropTypes.func,
};
