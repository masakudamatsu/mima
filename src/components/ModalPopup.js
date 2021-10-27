import {useContext} from 'react';
import PropTypes from 'prop-types';

import {NightModeContext} from 'src/context/NightModeContext';

import {ButtonSquare} from 'src/elements/ButtonSquare';
import {DivDialog} from 'src/elements/DivDialog';
import {DivScrim} from 'src/elements/DivScrim';
import {DivPopup} from 'src/elements/DivPopup';
import {SvgClose} from 'src/elements/SvgClose';

import {buttonLabel} from 'src/utils/uiCopies';

export const ModalPopup = ({
  children,
  handleClickCloseButton,
  hidden,
  slideFrom,
  titleId,
}) => {
  const nightMode = useContext(NightModeContext);
  const handleClick = () => {
    handleClickCloseButton();
  };
  return (
    <DivDialog role="dialog" aria-labelledby={titleId} aria-hidden={hidden}>
      <DivScrim />
      <DivPopup
        data-darkmode={nightMode}
        data-hidden={hidden}
        data-slide-from={slideFrom}
        role="document"
      >
        {handleClickCloseButton && (
          <ButtonSquare
            data-darkmode={nightMode}
            data-testid="close-button"
            onClick={handleClick}
            type="button"
          >
            <SvgClose title={buttonLabel.close} />
          </ButtonSquare>
        )}
        {children}
      </DivPopup>
    </DivDialog>
  );
};

ModalPopup.propTypes = {
  children: PropTypes.element,
  handleClickCloseButton: PropTypes.func,
  hidden: PropTypes.bool,
  slideFrom: PropTypes.string,
  titleId: PropTypes.string.isRequired,
};
