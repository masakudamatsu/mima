import PropTypes from 'prop-types';
import Autolinker from 'autolinker';

import {PlaceDataPopup} from 'src/components/PlaceDataPopup';
import {ButtonDialog} from 'src/elements/ButtonDialog';
import {ButtonCircle} from 'src/elements/ButtonCircle';
import {DivParagraphHolder} from 'src/elements/DivParagraphHolder';
import {H2PlaceName} from 'src/elements/H2PlaceName';
import {SvgClose} from 'src/elements/SvgClose';
import {buttonLabel} from 'src/utils/uiCopies';

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
  return (
    <PlaceDataPopup
      handleClickOutside={closePlaceInfo}
      hidden={false}
      slideFrom="bottom"
      titleId="selected-place"
    >
      <ButtonCircle
        data-autofocus
        data-testid="close-button-saved-place"
        onClick={closePlaceInfo}
        type="button"
      >
        <SvgClose title={buttonLabel.close} />
      </ButtonCircle>
      <H2PlaceName id="selected-place">{placeName}</H2PlaceName>
      <DivParagraphHolder
        dangerouslySetInnerHTML={{
          __html: autolinker.link(placeNoteHtml),
        }}
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
    </PlaceDataPopup>
  );
};

PlaceInfo.propTypes = {
  closePlaceInfo: PropTypes.func,
  editPlaceInfo: PropTypes.func,
  importPlaceInfoEditor: PropTypes.func,
  placeName: PropTypes.string,
  placeNoteHtml: PropTypes.string,
};
