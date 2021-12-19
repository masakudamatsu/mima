import React from 'react';
import PropTypes from 'prop-types';

import {CloseButton} from './CloseButton';

export const SearchBox = ({handleClickCloseButton}) => {
  return <CloseButton handleClick={handleClickCloseButton} />;
};

SearchBox.propTypes = {
  handleClickCloseButton: PropTypes.func,
};
