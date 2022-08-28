// import React from 'react';
import PropTypes from 'prop-types';

import {ButtonCircle} from 'src/elements/ButtonCircle';
import {createRipple} from 'src/utils/createRipple';

// TODO #201:
// 2. Reuse this component in MenuButton, PlaceInfo
export const CloseButton = ({
  ariaControls = null,
  ariaExpanded = null,
  ariaLabel,
  autofocus = false,
  handleClick,
  testId = null,
}) => {
  const clickHandler = event => {
    createRipple(event);
    handleClick();
  };
  return (
    <>
      <ButtonCircle
        aria-controls={ariaControls}
        aria-expanded={ariaExpanded}
        aria-label={ariaLabel}
        data-autofocus={autofocus}
        data-testid={testId}
        onClick={clickHandler}
        type="button"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          {/* source: https://fonts.google.com/icons?selected=Material%20Icons%20Outlined%3Aclose%3A */}
        </svg>
      </ButtonCircle>
    </>
  );
};

CloseButton.propTypes = {
  ariaControls: PropTypes.string,
  ariaExpanded: PropTypes.string,
  ariaLabel: PropTypes.string.isRequired,
  autofocus: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
  testId: PropTypes.string,
};
