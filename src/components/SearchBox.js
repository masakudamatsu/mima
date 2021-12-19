import React from 'react';
import PropTypes from 'prop-types';

import {CloseButton} from './CloseButton';

import {DivSearchBoxWrapper} from 'src/elements/DivSearchBoxWrapper';
import {InputSearchBox} from 'src/elements/InputSearchBox';
import {SearchSubmitButton} from './SearchSubmitButton';

export const SearchBox = ({handleClickCloseButton}) => {
  return (
    <>
      <CloseButton handleClick={handleClickCloseButton} />
      <DivSearchBoxWrapper>
        <InputSearchBox
          aria-label="Search for a place on the map"
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
