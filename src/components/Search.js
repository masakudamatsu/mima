import {useEffect, useState} from 'react';
// import PropTypes from 'prop-types';

import {SearchButton} from './SearchButton';

import {DivCloudBackground} from 'src/elements/DivCloudBackground';
import {ParagraphLoading} from 'src/elements/ParagraphLoading';

import {duration} from 'src/utils/designtokens';

import dynamic from 'next/dynamic';
const importSearchBox = () =>
  import('src/components/SearchBox').then(module => module.SearchBox);
const SearchBox = dynamic(importSearchBox, {
  loading: () => <ParagraphLoading>Loading...</ParagraphLoading>,
});

export const Search = () => {
  const [searchBoxOpen, setSearchBoxOpen] = useState('false');

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

  return (
    <form role="search">
      <SearchButton
        handleClick={handleClickSearchButton}
        importSearchBox={importSearchBox}
      />
      {searchBoxOpen !== 'false' && (
        <DivCloudBackground
          data-testid="cloud-background"
          data-transition-out={searchBoxOpen === 'closing'}
        >
          <SearchBox handleClickCloseButton={handleClickCloseButton} />
        </DivCloudBackground>
      )}
    </form>
  );
};

// Search.propTypes = {};
