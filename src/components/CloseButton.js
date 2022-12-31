import {forwardRef, useImperativeHandle, useRef} from 'react';
import PropTypes from 'prop-types';

import {ButtonCircle} from 'src/elements/ButtonCircle';

// TODO #201:
// 2. Reuse this component in MenuButton
export const CloseButton = forwardRef(function CloseButton(
  {ariaExpanded = null, ariaLabel, handleClick, testId = null},
  ref,
) {
  const buttonElement = useRef();
  const focusButton = () => buttonElement.current.focus();
  useImperativeHandle(ref, () => ({focusButton}));
  const clickHandler = () => {
    handleClick();
  };

  return (
    <>
      <ButtonCircle
        aria-expanded={ariaExpanded}
        aria-label={ariaLabel}
        data-testid={testId}
        onClick={clickHandler}
        ref={buttonElement}
        type="button"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          {/* source: https://fonts.google.com/icons?selected=Material%20Icons%20Outlined%3Aclose%3A */}
        </svg>
      </ButtonCircle>
    </>
  );
});

CloseButton.propTypes = {
  ariaExpanded: PropTypes.string,
  ariaLabel: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  testId: PropTypes.string,
};
