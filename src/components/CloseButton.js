// import React from 'react';
import PropTypes from 'prop-types';

import {ButtonSquare} from 'src/elements/ButtonSquare';
import {SvgClose} from 'src/elements/SvgClose';

import {buttonLabel} from 'src/utils/uiCopies';

// TODO #201:
// 2. Reuse this component in MenuButton and PlaceInfo
export const CloseButton = ({
  ariaControls,
  autofocus = false,
  handleClick,
  testId,
}) => {
  return (
    <>
      <ButtonSquare
        aria-controls={ariaControls}
        aria-expanded="true"
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
  ariaControls: PropTypes.string,
  autofocus: PropTypes.bool,
  handleClick: PropTypes.func,
  testId: PropTypes.string,
};
