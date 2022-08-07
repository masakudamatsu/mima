import {useContext, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import FocusLock from 'react-focus-lock';
import {useCombobox} from 'downshift';

import {CloseButton} from './CloseButton';

import {ComposeSearchBox} from 'src/elements/ComposeSearchBox';
import {ListAutocomplete} from 'src/elements/ListAutocomplete';
import {SvgPlace} from 'src/elements/SvgPlace';

import {VisuallyHidden} from 'src/elements/VisuallyHidden';

import {PlaceIdContext} from 'src/wrappers/PlaceIdContext';
import {autocomplete} from 'src/utils/designtokens';
import {dimension} from 'src/utils/designtokens';
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
      <ComposeSearchBox {...getComboboxProps()}>
        <VisuallyHidden {...getLabelProps()} as="label">
          {searchBoxLabel.ariaLabel}
        </VisuallyHidden>
        <svg
          aria-hidden="true"
          height={dimension.button['minimum target size 75']}
          viewBox="0 0 24 24"
          width={dimension.button['minimum target size 75']}
        >
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          {/* 
      source: https://fonts.google.com/icons?selected=Material%20Icons%20Outlined%3Asearch%3A
       */}
        </svg>
        <input
          {...getInputProps({
            autoFocus: true,
            'data-testid': 'searchbox-first-focusable-element', // to test focus management
            inputMode: 'search',
            placeholder: searchBoxLabel.placeholder,
            type: 'search',
          })}
        />{' '}
      </ComposeSearchBox>
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
