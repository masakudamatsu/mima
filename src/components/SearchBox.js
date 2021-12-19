import React from 'react';
import PropTypes from 'prop-types';

import {CloseButton} from './CloseButton';

import {DivSearchBoxWrapper} from 'src/elements/DivSearchBoxWrapper';
import {InputSearchBox} from 'src/elements/InputSearchBox';
import {SearchSubmitButton} from './SearchSubmitButton';

import {searchBoxLabel} from 'src/utils/uiCopies';

export const SearchBox = ({handleClickCloseButton}) => {
  return (
    <>
      <CloseButton handleClick={handleClickCloseButton} />
      <DivSearchBoxWrapper>
        <InputSearchBox
          aria-label={searchBoxLabel}
          autoFocus
          data-testid="search-box" // to test whether it's focused after opened
          inputMode="search"
          placeholder="Enter place name or address"
          type="search"
        />{' '}
        <SearchSubmitButton />
      </DivSearchBoxWrapper>
    </>
  );
};

SearchBox.propTypes = {
  handleClickCloseButton: PropTypes.func,
};
