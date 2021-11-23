import {useRef} from 'react';
import PropTypes from 'prop-types';
import FocusLock from 'react-focus-lock';

import {useOnClickOutside} from 'src/hooks/useOnClickOutside';
import {DivDialog} from 'src/elements/DivDialog';
import {DivPopup} from 'src/elements/DivPopup';

export const PlaceDataPopup = ({
  children,
  handleClickOutside,
  hidden,
  slideFrom,
  titleId,
}) => {
  // close by clicking outside
  const dialogDiv = useRef(null);
  useOnClickOutside(dialogDiv, handleClickOutside);

  return (
    <FocusLock disabled={hidden} returnFocus>
      <DivDialog
        ref={dialogDiv}
        role="dialog"
        aria-labelledby={titleId}
        aria-hidden={hidden}
      >
        <DivPopup
          data-hidden={hidden}
          data-placedatapopup="true"
          data-slide-from={slideFrom}
          role="document"
        >
          {children}
        </DivPopup>
      </DivDialog>
    </FocusLock>
  );
};

PlaceDataPopup.propTypes = {
  children: PropTypes.node,
  handleClickOutside: PropTypes.func,
  hidden: PropTypes.bool,
  slideFrom: PropTypes.string,
  titleId: PropTypes.string.isRequired,
};
