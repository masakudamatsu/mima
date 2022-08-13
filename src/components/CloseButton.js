// import React from 'react';
import PropTypes from 'prop-types';

import {ButtonSquare} from 'src/elements/ButtonSquare';

import {buttonLabel} from 'src/utils/uiCopies';
import {dimension} from 'src/utils/designtokens';

// TODO #201:
// 2. Reuse this component in MenuButton, PlaceInfo, SearchedPlace
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
        aria-label={buttonLabel.close}
        data-autofocus={autofocus}
        data-testid={testId}
        onClick={handleClick}
        type="button"
      >
        <svg
          aria-hidden="true"
          height={dimension.button['minimum target size 75']}
          viewBox="0 0 24 24"
          width={dimension.button['minimum target size 75']}
        >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          {/* source: https://fonts.google.com/icons?selected=Material%20Icons%20Outlined%3Aclose%3A */}
        </svg>
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
