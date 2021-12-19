// import React from 'react';
import PropTypes from 'prop-types';

import {ButtonSquare} from 'src/elements/ButtonSquare';
import {SvgSearch} from 'src/elements/SvgSearch';

import {buttonLabel} from 'src/utils/uiCopies';

export const SearchSubmitButton = () => {
  const handleClick = event => {
    event.preventDefault();
  };
  return (
    <ButtonSquare
      aria-label={buttonLabel.searchSubmit}
      onClick={handleClick}
      type="submit"
    >
      <SvgSearch title={buttonLabel.close} />
    </ButtonSquare>
  );
};

SearchSubmitButton.propTypes = {
  handleClick: PropTypes.func,
};
