import {useContext, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useCombobox} from 'downshift';

import {ComposeSearchBox} from 'src/elements/ComposeSearchBox';
import {ListAutocomplete} from 'src/elements/ListAutocomplete';
import {SvgPlace} from 'src/elements/SvgPlace';

import {VisuallyHidden} from 'src/elements/VisuallyHidden';

import {PlaceIdContext} from 'src/wrappers/PlaceIdContext';
import {autocomplete} from 'src/utils/designtokens';
import {searchBoxLabel} from 'src/utils/uiCopies';

import {boldSubstring} from 'src/utils/boldSubstring';

export const SearchBox = ({handleClickCloseButton, id}) => {
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
            return {
              id: prediction.place_id,
              name: {
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
                string: prediction.structured_formatting.main_text,
              },
              address: prediction.structured_formatting.secondary_text && {
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
                string: prediction.structured_formatting.secondary_text,
              },
            };
          });
          setInputItems(autocompleteSuggestions);
        },
      );
    },
  });

  return (
    <>
      <ComposeSearchBox id={id}>
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          {/* 
      source: https://fonts.google.com/icons?selected=Material%20Icons%20Outlined%3Asearch%3A
       */}
        </svg>
        <input
          {...getComboboxProps(
            {
              'aria-haspopup': null,
              'aria-owns': null,
            },
            {suppressRefError: true}, // otherwise, an error message appears even after Jest tests pass
          )}
          {...getInputProps({
            'aria-label': searchBoxLabel.ariaLabel,
            'aria-labelledby': null, // override the default
            autoFocus: true,
            'data-testid': 'searchbox-first-focusable-element', // to test focus management
            inputMode: 'search',
            placeholder: searchBoxLabel.placeholder,
            type: 'search',
          })}
        />{' '}
      </ComposeSearchBox>
      <ListAutocomplete
        {...getMenuProps({
          'aria-label': searchBoxLabel.listbox,
          'aria-labelledby': null,
        })}
      >
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
    </>
  );
};

SearchBox.propTypes = {
  handleClickCloseButton: PropTypes.func,
  id: PropTypes.string,
};
