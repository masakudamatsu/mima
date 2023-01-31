import {useContext, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useCombobox} from 'downshift';

import {ComposeSearchBox} from 'src/elements/ComposeSearchBox';
import {ListAutocomplete} from 'src/elements/ListAutocomplete';

import {VisuallyHidden} from 'src/elements/VisuallyHidden';

import {PlaceIdContext} from 'src/wrappers/PlaceIdContext';
import {searchBoxLabel} from 'src/utils/uiCopies';

import {boldSubstring} from 'src/utils/boldSubstring';
import {createRipple} from 'src/utils/createRipple';

export const SearchBox = ({closeSearchBox, id}) => {
  const [, setPlaceId] = useContext(PlaceIdContext);

  const google = window.google;
  const service = new google.maps.places.AutocompleteService();
  const sessionToken = useMemo(
    () => new google.maps.places.AutocompleteSessionToken(),
    [google.maps.places.AutocompleteSessionToken],
  );
  const [inputItems, setInputItems] = useState([]);
  const {
    getInputProps,
    getItemProps,
    getMenuProps,
    highlightedIndex,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({inputValue}) => {
      if (inputValue === '') {
        setInputItems([]);
        return;
      }
      service.getPlacePredictions(
        {
          input: inputValue,
          sessionToken: sessionToken,
          // TODO: Add more options to location-bias search to a particular area (issue #195)
        },
        handlePredictions,
      );
      function handlePredictions(predictions, status) {
        if (status !== 'OK' || !predictions) {
          // TODO: Handle error more properly (issue #196)
          console.error('Google Maps Places Autocomplete API call has failed.');
          setInputItems([]);
          return;
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
      }
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
          {...getInputProps({
            'aria-expanded': inputItems.length > 0,
            'aria-label': searchBoxLabel.ariaLabel,
            'aria-labelledby': null, // override the default
            autoFocus: true,
            'data-testid': 'searchbox-first-focusable-element', // to test focus management
            inputMode: 'search',
            onKeyDown: event => {
              if (event.key === 'Enter') {
                event.preventDefault(); // prevent page refresh
                if (highlightedIndex === -1) {
                  return;
                }
                createRipple(event);
                setPlaceId(inputItems[highlightedIndex].id);
                closeSearchBox();
              }
            },
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
        {inputItems.length > 0
          ? inputItems.map((item, index) => {
              return (
                <li
                  key={item.id}
                  data-highlighted={highlightedIndex === index}
                  {...getItemProps({
                    item,
                    index,
                    onClick: event => {
                      createRipple(event);
                      setPlaceId(item.id);
                      closeSearchBox();
                    },
                  })}
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
                      <VisuallyHidden as="span">
                        Found in Google Maps
                      </VisuallyHidden>
                      <svg aria-hidden="true" viewBox="0 0 24 24">
                        <path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z" />
                        {/* source: https://fonts.google.com/icons?selected=Material%20Icons%20Outlined%3Aplace%3A */}
                      </svg>
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
  closeSearchBox: PropTypes.func,
  id: PropTypes.string,
};
