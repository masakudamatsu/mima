import {useMemo, useState} from 'react';
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

import {autocomplete} from 'src/utils/designtokens';
import {searchBoxLabel} from 'src/utils/uiCopies';

export const SearchBox = ({handleClickCloseButton}) => {
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
        {input: inputValue, sessionToken: sessionToken},
        (predictions, status) => {
          if (status === 'OK') {
            const autocompleteSuggestions = predictions.map(prediction => {
              return {
                id: prediction.place_id,
                name: prediction.structured_formatting.main_text,
                address: prediction.structured_formatting.secondary_text,
              };
            });
            setInputItems(autocompleteSuggestions);
          }
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
                >
                  <dl>
                    <dt>{item.name}</dt>
                    <dd data-dd-type="address">{item.address}</dd>
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
