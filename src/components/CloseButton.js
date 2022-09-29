import {forwardRef, useImperativeHandle, useRef} from 'react';
import PropTypes from 'prop-types';

import {ButtonCircle} from 'src/elements/ButtonCircle';
import {createRipple} from 'src/utils/createRipple';

// TODO #201:
// 2. Reuse this component in MenuButton
export const CloseButton = forwardRef(function CloseButton(
  {
    ariaControls = null,
    ariaExpanded = null,
    ariaLabel,
    handleClick,
    testId = null,
  },
  ref,
) {
  const buttonElement = useRef();
  const focusButton = () => buttonElement.current.focus();
  useImperativeHandle(ref, () => ({focusButton}));
  const clickHandler = event => {
    createRipple(event);
    handleClick();
  };
  const keydownHandler = event => {
    if (event.key === 'Enter') {
      event.preventDefault(); // otherwise click event will be fired as well
      createRipple(event);
      handleClick();
    }
  };

  return (
    <>
      <ButtonCircle
        aria-controls={ariaControls}
        aria-expanded={ariaExpanded}
        aria-label={ariaLabel}
        data-testid={testId}
        onClick={clickHandler}
        onKeyDown={keydownHandler}
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
  ariaControls: PropTypes.string,
  ariaExpanded: PropTypes.string,
  ariaLabel: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  testId: PropTypes.string,
};
