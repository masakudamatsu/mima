import {useContext} from 'react';
import PropTypes from 'prop-types';

import {NightModeContext} from 'src/context/NightModeContext';

import {DivDialog} from 'src/elements/DivDialog';
import {DivScrim} from 'src/elements/DivScrim';
import {DivPopup} from 'src/elements/DivPopup';

export const ModalPopup = ({children, hidden, slideFrom, titleId}) => {
  const nightMode = useContext(NightModeContext);
  return (
    <DivDialog role="dialog" aria-labelledby={titleId} aria-hidden={hidden}>
      <DivScrim />
      <DivPopup
        data-darkmode={nightMode}
        data-hidden={hidden}
        data-slide-from={slideFrom}
        role="document"
      >
        {children}
      </DivPopup>
    </DivDialog>
  );
};

ModalPopup.propTypes = {
  children: PropTypes.node,
  hidden: PropTypes.bool,
  slideFrom: PropTypes.string,
  titleId: PropTypes.string.isRequired,
};
