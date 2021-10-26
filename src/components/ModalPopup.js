import {useContext} from 'react';
import PropTypes from 'prop-types';

import {NightModeContext} from 'src/context/NightModeContext';
import {ButtonSquare} from 'src/elements/ButtonSquare';
import {DivScrim} from 'src/elements/DivScrim';
import {DivPopup} from 'src/elements/DivPopup';
import {SvgClose} from 'src/elements/SvgClose';

export const ModalPopup = ({children, setModalPopupHidden}) => {
  const nightMode = useContext(NightModeContext);
  const handleClick = () => {
    setModalPopupHidden(true);
  };
  return (
    <DivScrim>
      <DivPopup data-darkmode={nightMode}>
        {/* <ButtonSquare
          data-darkmode={nightMode}
          onClick={handleClick}
          type="button"
        >
          <SvgClose title="Close dialog" />
        </ButtonSquare> */}
        {children}
      </DivPopup>
    </DivScrim>
  );
};

ModalPopup.propTypes = {
  children: PropTypes.element,
  setModalPopupHidden: PropTypes.func.isRequired,
};
