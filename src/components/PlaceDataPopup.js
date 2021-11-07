import PropTypes from 'prop-types';
import FocusLock from 'react-focus-lock';

import {DivDialog} from 'src/elements/DivDialog';
import {DivPopup} from 'src/elements/DivPopup';

export const PlaceDataPopup = ({children, hidden, slideFrom, titleId}) => {
  return (
    <FocusLock disabled={hidden} returnFocus>
      <DivDialog role="dialog" aria-labelledby={titleId} aria-hidden={hidden}>
        <DivPopup
          data-height="one-third"
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

PlaceDataPopup.propTypes = {
  children: PropTypes.node,
  hidden: PropTypes.bool,
  slideFrom: PropTypes.string,
  titleId: PropTypes.string.isRequired,
};
