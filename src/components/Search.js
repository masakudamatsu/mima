import {useEffect, useState} from 'react';
// import PropTypes from 'prop-types';

import {CloseButton} from './CloseButton';
import {SearchButton} from './SearchButton';

import {DivCloudBackground} from 'src/elements/DivCloudBackground';

import {duration} from 'src/utils/designtokens';

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
      {searchBoxOpen !== 'true' && (
        <SearchButton handleClick={handleClickSearchButton} />
      )}
      {searchBoxOpen !== 'false' && (
        <DivCloudBackground
          data-testid="cloud-background"
          data-transition-out={searchBoxOpen === 'closing'}
        >
          <CloseButton handleClick={handleClickCloseButton} />
        </DivCloudBackground>
      )}
    </form>
  );
};

// Search.propTypes = {};
