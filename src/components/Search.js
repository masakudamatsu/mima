import {useState} from 'react';
// import PropTypes from 'prop-types';

import {CloseButton} from './CloseButton';
import {SearchButton} from './SearchButton';

import {DivCloudBackground} from 'src/elements/DivCloudBackground';

export const Search = () => {
  const [searchBoxOpen, setSearchBoxOpen] = useState(false);
  return (
    <form role="search">
      {searchBoxOpen ? (
        <DivCloudBackground>
          <CloseButton handleClick={() => setSearchBoxOpen(false)} />
        </DivCloudBackground>
      ) : (
        <SearchButton setSearchBoxOpen={setSearchBoxOpen} />
      )}
    </form>
  );
};

// Search.propTypes = {};
