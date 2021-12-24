import React from 'react';
import PropTypes from 'prop-types';
import FocusLock from 'react-focus-lock';

import {CloseButton} from './CloseButton';

import {DivSearchBoxWrapper} from 'src/elements/DivSearchBoxWrapper';
import {InputSearchBox} from 'src/elements/InputSearchBox';
import {DescListAutocomplete} from 'src/elements/DescListAutocomplete';
import {SearchSubmitButton} from './SearchSubmitButton';
import {SvgPlace} from 'src/elements/SvgPlace';
import {VisuallyHidden} from 'src/elements/VisuallyHidden';

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
          aria-label={searchBoxLabel.ariaLabel}
          autoFocus
          data-testid="searchbox-first-focusable-element" // to test focus management
          inputMode="search"
          placeholder={searchBoxLabel.placeholder}
          type="search"
        />{' '}
        <SearchSubmitButton />
      </DivSearchBoxWrapper>
      <DescListAutocomplete>
        <div>
          <dt>Fukuda Art Museum</dt>
          <dd data-dd-type="address">
            3-16 Sagatenryuji Susukinobabacho, Ukyo Ward, Kyoto
          </dd>
          <dd data-dd-type="icon">
            <SvgPlace />
            <VisuallyHidden as="span">Found in Google Maps</VisuallyHidden>
          </dd>
        </div>
        <div>
          <dt>bread, espresso & fukuda museum of art</dt>
          <dd data-dd-type="address">
            3-16 Sagatenryuji Susukinobabacho, Ukyo Ward, Kyoto
          </dd>
          <dd data-dd-type="icon">
            <SvgPlace />
            <VisuallyHidden as="span">Found in Google Maps</VisuallyHidden>
          </dd>
        </div>
      </DescListAutocomplete>
    </FocusLock>
  );
};

SearchBox.propTypes = {
  handleClickCloseButton: PropTypes.func,
};
