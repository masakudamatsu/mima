import {useEffect, useRef, useState} from 'react';
// import PropTypes from 'prop-types';
import FocusLock from 'react-focus-lock';

import {CloseButton} from './CloseButton';
import {Button} from 'src/elements/Button';
import {SvgCloud} from 'src/elements/SvgCloud';

import {FormSearch} from 'src/elements/FormSearch';
import {ParagraphLoading} from 'src/elements/ParagraphLoading';

import {useOnEscKeyDown} from 'src/hooks/useOnEscKeyDown';

import {buttonLabel} from 'src/utils/uiCopies';

import dynamic from 'next/dynamic';
const importSearchBox = () =>
  import('src/components/SearchBox').then(module => module.SearchBox);
const SearchBox = dynamic(importSearchBox, {
  loading: () => <ParagraphLoading>Loading...</ParagraphLoading>,
});

export const Search = () => {
  const [searchBoxOpen, setSearchBoxOpen] = useState('false');

  // Open search box
  const handleClickSearchButton = () => {
    setSearchBoxOpen('true');
  };

  // Close search box by pressing close button
  const handleClickCloseButton = () => {
    closeButtonPressed.current = true;
    setSearchBoxOpen('closing');
  };
  // Close search box by selecting an autocomplete suggestion
  const closeSearchBox = () => {
    closeButtonPressed.current = false;
    setSearchBoxOpen('closing');
  };
  // Remove search box from DOM after transition animation is over
  const handleAnimationEnd = () => {
    if (searchBoxOpen === 'closing') {
      setSearchBoxOpen('false');
    }
  };

  // close with Esc key
  useOnEscKeyDown({
    state: searchBoxOpen === 'true',
    handler: handleClickCloseButton,
  });

  // Focus the search button after closing the searchbox
  const buttonElement = useRef();
  const closeButtonPressed = useRef(false);
  useEffect(() => {
    if (searchBoxOpen === 'false') {
      if (closeButtonPressed.current === true) {
        buttonElement.current.focus();
      }
    }
  });

  return (
    <FormSearch
      data-searchbox={searchBoxOpen}
      onAnimationEnd={handleAnimationEnd}
    >
      {searchBoxOpen === 'false' ? (
        <Button
          aria-expanded="false"
          aria-label={buttonLabel.search}
          data-position="top-right"
          data-testid="search-button"
          onClick={handleClickSearchButton}
          onFocus={importSearchBox}
          onMouseEnter={importSearchBox}
          ref={buttonElement}
          type="button"
        >
          <SvgCloud icon="search" />
        </Button>
      ) : (
        <FocusLock>
          <CloseButton
            ariaExpanded="true"
            ariaLabel={buttonLabel.closeSearchbox}
            handleClick={handleClickCloseButton}
            testId="searchbox-last-focusable-element" // to test focus management
          />
          <SearchBox closeSearchBox={closeSearchBox} id="searchbox" />
        </FocusLock>
      )}
    </FormSearch>
  );
};

// Search.propTypes = {};
