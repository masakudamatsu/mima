import {useEffect, useRef, useState} from 'react';
// import PropTypes from 'prop-types';
import FocusLock from 'react-focus-lock';

import {CloseButton} from './CloseButton';
import {Button} from 'src/elements/Button';
import {SvgCloud} from 'src/elements/SvgCloud';

import {DivSearchBackground} from 'src/elements/DivSearchBackground';
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
  const [searchBox, setSearchBox] = useState('closed');

  const searchBackground = useRef();

  // Open search box
  const handleClickSearchButton = () => {
    setSearchBox('open');
  };

  // Close search box by pressing close button
  const handleClickCloseButton = () => {
    closeButtonPressed.current = true;
    searchBackground.current.dataset.closing = 'true';
  };
  // Close search box by selecting an autocomplete suggestion
  const closeSearchBox = () => {
    closeButtonPressed.current = false;
    searchBackground.current.dataset.closing = 'true';
  };
  // Remove search box from DOM after transition animation is over
  const handleAnimationEnd = () => {
    if (searchBackground.current.dataset.closing === 'true') {
      setSearchBox('closed');
    }
  };

  // close with Esc key
  useOnEscKeyDown({
    state: searchBox === 'open',
    handler: handleClickCloseButton,
  });

  // Focus the search button after closing the searchbox
  const buttonElement = useRef();
  const closeButtonPressed = useRef(false);
  useEffect(() => {
    if (searchBox === 'closed') {
      if (closeButtonPressed.current === true) {
        buttonElement.current.focus();
      }
    }
  });

  return (
    <form role="search">
      {searchBox === 'closed' ? (
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
          <DivSearchBackground
            data-closing="false"
            data-testid="div-search-background"
            onAnimationEnd={handleAnimationEnd}
            ref={searchBackground}
          >
            <CloseButton
              ariaExpanded="true"
              ariaLabel={buttonLabel.closeSearchbox}
              handleClick={handleClickCloseButton}
              testId="searchbox-last-focusable-element" // to test focus management
            />
            <SearchBox closeSearchBox={closeSearchBox} id="searchbox" />
          </DivSearchBackground>
        </FocusLock>
      )}
    </form>
  );
};

// Search.propTypes = {};
