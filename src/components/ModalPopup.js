import PropTypes from 'prop-types';
import FocusLock from 'react-focus-lock';

import {DivDialog} from 'src/elements/DivDialog';
import {DivScrim} from 'src/elements/DivScrim';
import {DivPopup} from 'src/elements/DivPopup';

export const ModalPopup = ({alert, children, hidden, slideFrom, titleId}) => {
  return (
    <FocusLock disabled={hidden} returnFocus>
      <DivDialog
        role={alert ? 'alertdialog' : 'dialog'}
        aria-labelledby={titleId}
        aria-hidden={hidden}
      >
        <DivScrim />
        <DivPopup
          data-hidden={hidden}
          data-slide-from={slideFrom}
          role="document"
        >
          {children}
        </DivPopup>
      </DivDialog>
    </FocusLock>
  );
};

ModalPopup.propTypes = {
  children: PropTypes.node,
  hidden: PropTypes.bool,
  slideFrom: PropTypes.string,
  titleId: PropTypes.string.isRequired,
};
