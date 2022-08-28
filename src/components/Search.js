import {useEffect, useRef, useState} from 'react';
// import PropTypes from 'prop-types';
import FocusLock from 'react-focus-lock';

import {CloseButton} from './CloseButton';
import {Button} from 'src/elements/Button';
import {SvgCloud} from 'src/elements/SvgCloud';

import {FormSearch} from 'src/elements/FormSearch';
import {ParagraphLoading} from 'src/elements/ParagraphLoading';

import {buttonLabel} from 'src/utils/uiCopies';
import {duration} from 'src/utils/designtokens';

import dynamic from 'next/dynamic';
const importSearchBox = () =>
  import('src/components/SearchBox').then(module => module.SearchBox);
const SearchBox = dynamic(importSearchBox, {
  loading: () => <ParagraphLoading>Loading...</ParagraphLoading>,
});

export const Search = () => {
  const [searchBoxOpen, setSearchBoxOpen] = useState('false');

  const buttonElement = useRef();
  const handleClickSearchButton = () => {
    setSearchBoxOpen('true');
  };
  const handleClickCloseButton = () => {
    setSearchBoxOpen('closing');
  };
  useEffect(() => {
    if (searchBoxOpen === 'closing') {
      setTimeout(() => {
        setSearchBoxOpen('false');
      }, duration.modal.exit);
    }
  }, [searchBoxOpen]);

  // Focus the search button after closing the searchbox
  useEffect(() => {
    if (searchBoxOpen === 'false') {
      buttonElement.current.focus();
    }
  });

  const searchboxId = 'searchbox';

  return (
    <FormSearch data-searchbox={searchBoxOpen}>
      {searchBoxOpen === 'false' ? (
        <Button
          aria-controls={searchboxId}
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
            ariaControls={searchboxId}
            ariaExpanded="true"
            ariaLabel={buttonLabel.closeSearchbox}
            handleClick={handleClickCloseButton}
            testId="searchbox-last-focusable-element" // to test focus management
          />
          <SearchBox
            handleClickCloseButton={handleClickCloseButton}
            id={searchboxId}
          />
        </FocusLock>
      )}
    </FormSearch>
  );
};

// Search.propTypes = {};
