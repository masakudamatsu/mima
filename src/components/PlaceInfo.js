import PropTypes from 'prop-types';
import Autolinker from 'autolinker';

import {PlaceDataPopup} from 'src/components/PlaceDataPopup';
import {ButtonDialog} from 'src/elements/ButtonDialog';
import {ButtonSquare} from 'src/elements/ButtonSquare';
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
  placeName,
  placeNoteHtml,
  setEditMode,
}) => {
  return (
    <PlaceDataPopup
      handleClickOutside={closePlaceInfo}
      hidden={false}
      slideFrom="bottom"
      titleId="selected-place"
    >
      <ButtonSquare
        data-autofocus
        data-testid="close-button-saved-place"
        onClick={closePlaceInfo}
        type="button"
      >
        <SvgClose title={buttonLabel.close} />
      </ButtonSquare>
      <H2PlaceName id="selected-place">{placeName}</H2PlaceName>
      <DivParagraphHolder
        dangerouslySetInnerHTML={{
          __html: autolinker.link(placeNoteHtml),
        }}
      />
      <ButtonDialog onClick={() => setEditMode(true)} type="button">
        {buttonLabel.edit}
      </ButtonDialog>
    </PlaceDataPopup>
  );
};

PlaceInfo.propTypes = {
  closePlaceInfo: PropTypes.func,
  placeName: PropTypes.string,
  placeNoteHtml: PropTypes.string,
  setEditMode: PropTypes.func,
};