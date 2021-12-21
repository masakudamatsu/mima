// import React from 'react';
import PropTypes from 'prop-types';

import {ButtonSquare} from 'src/elements/ButtonSquare';
import {SvgClose} from 'src/elements/SvgClose';

import {buttonLabel} from 'src/utils/uiCopies';

export const CloseButton = ({autofocus = false, handleClick, testId}) => {
  return (
    <>
      <ButtonSquare
        data-autofocus={autofocus}
        data-testid={testId}
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
  testId: PropTypes.string,
};
