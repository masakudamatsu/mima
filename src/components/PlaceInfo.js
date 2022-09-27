import {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import Autolinker from 'autolinker';

import {ButtonDialog} from 'src/elements/ButtonDialog';
import {CloseButton} from './CloseButton';
import {ComposeDialog} from 'src/elements/ComposeDialog';

import {buttonLabel} from 'src/utils/uiCopies';
import {useOnClickOutside} from 'src/hooks/useOnClickOutside';

// Prepare for converting URL text into link
const autolinker = new Autolinker({
  truncate: 25,
}); // https://github.com/gregjacobs/Autolinker.js#usage

export const PlaceInfo = ({
  closePlaceInfo,
  editPlaceInfo,
  importPlaceInfoEditor,
  placeName,
  placeNoteHtml,
}) => {
  // For autofocusing the close button when opened
  const closeButton = useRef();
  useEffect(() => {
    closeButton.current.focusButton();
  });
  // close by clicking outside
  const dialogDiv = useRef(null);
  useOnClickOutside(dialogDiv, closePlaceInfo);
  return (
    <ComposeDialog // role="dialog" included
      aria-describedby="selected-place-detail"
      aria-labelledby="selected-place-name"
      // data-closing={status === 'closing'}
      ref={dialogDiv}
    >
      <CloseButton
        ariaLabel={buttonLabel.close}
        handleClick={closePlaceInfo}
        ref={closeButton}
        testId="close-button-saved-place"
      />
      <h2 id="selected-place-name">{placeName}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: autolinker.link(placeNoteHtml),
        }}
        id="selected-place-detail"
      />
      <ButtonDialog
        onClick={editPlaceInfo}
        onFocus={importPlaceInfoEditor}
        onMouseEnter={importPlaceInfoEditor}
        type="button"
      >
        {buttonLabel.edit}
      </ButtonDialog>
      <ButtonDialog type="button">{buttonLabel.delete}</ButtonDialog>
    </ComposeDialog>
  );
};

PlaceInfo.propTypes = {
  closePlaceInfo: PropTypes.func,
  editPlaceInfo: PropTypes.func,
  importPlaceInfoEditor: PropTypes.func,
  placeName: PropTypes.string,
  placeNoteHtml: PropTypes.string,
};
