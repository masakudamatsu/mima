import React from 'react';
import PropTypes from 'prop-types';
import FocusLock from 'react-focus-lock';

import {CloseButton} from './CloseButton';

import {DivSearchBoxWrapper} from 'src/elements/DivSearchBoxWrapper';
import {InputSearchBox} from 'src/elements/InputSearchBox';
import {SearchSubmitButton} from './SearchSubmitButton';

import {searchBoxLabel} from 'src/utils/uiCopies';

export const SearchBox = ({handleClickCloseButton}) => {
  return (
    <FocusLock returnFocus>
      <CloseButton
        handleClick={handleClickCloseButton}
        testId="searchbox-last-focusable-element" // to test focus management
      />
      <DivSearchBoxWrapper>
        <InputSearchBox
          aria-label={searchBoxLabel}
          autoFocus
          data-testid="searchbox-first-focusable-element" // to test focus management
          inputMode="search"
          placeholder="Enter place name or address"
          type="search"
        />{' '}
        <SearchSubmitButton />
      </DivSearchBoxWrapper>
    </FocusLock>
  );
};

SearchBox.propTypes = {
  handleClickCloseButton: PropTypes.func,
};
