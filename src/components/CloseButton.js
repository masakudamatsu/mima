// import React from 'react';
import PropTypes from 'prop-types';

import {ButtonSquare} from 'src/elements/ButtonSquare';
import {SvgClose} from 'src/elements/SvgClose';

import {buttonLabel} from 'src/utils/uiCopies';

export const CloseButton = ({autofocus = false, handleClick}) => {
  return (
    <>
      <ButtonSquare
        data-autofocus={autofocus}
        data-testid="close-button-menu"
        onClick={handleClick}
        type="button"
      >
        <SvgClose title={buttonLabel.close} />
      </ButtonSquare>
    </>
  );
};

CloseButton.propTypes = {
  autofocus: PropTypes.bool,
  handleClick: PropTypes.func,
};
