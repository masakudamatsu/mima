import {useContext} from 'react';
import PropTypes from 'prop-types';

import {NightModeContext} from 'src/context/NightModeContext';
import {DivDialog} from 'src/elements/DivDialog';
import {DivScrim} from 'src/elements/DivScrim';
import {DivPopup} from 'src/elements/DivPopup';

export const ModalPopup = ({children, hidden, titleId}) => {
  const nightMode = useContext(NightModeContext);
  return (
    <DivDialog role="dialog" aria-labelledby={titleId} aria-hidden={hidden}>
      <DivScrim />
      <DivPopup data-darkmode={nightMode} data-hidden={hidden} role="document">
        {children}
      </DivPopup>
    </DivDialog>
  );
};

ModalPopup.propTypes = {
  children: PropTypes.element,
  hidden: PropTypes.bool,
  titleId: PropTypes.string.isRequired,
};
