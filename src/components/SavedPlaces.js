import {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import Autolinker from 'autolinker';
import DOMPurify from 'dompurify';
import FocusLock from 'react-focus-lock';

import {ButtonDialog} from 'src/elements/ButtonDialog';
import {CloseButton} from './CloseButton';
import {ComposeDialog} from 'src/elements/ComposeDialog';
import {DivButtonsRow} from 'src/elements/DivButtonsRow';
import {DivCloud} from 'src/elements/DivCloud';
import {DivModalBackdrop} from 'src/elements/DivModalBackdrop';
import {DivPlaceInfoBackground} from 'src/elements/DivPlaceInfoBackground';
import {ParagraphLoading} from 'src/elements/ParagraphLoading';
import {SpanRipple} from 'src/elements/SpanRipple';

import {ClientOnlyPortal} from 'src/wrappers/ClientOnlyPortal';

import {usePlaces} from './Places';
import {useOnClickOutside} from 'src/hooks/useOnClickOutside';
import {useOnEscKeyDown} from 'src/hooks/useOnEscKeyDown';
import {NightModeContext} from 'src/wrappers/NightModeContext';

import {buttonLabel, linkText, loadingMessage, modal} from 'src/utils/uiCopies';

// import Tiptap only when necessary
import dynamic from 'next/dynamic';
const importTiptapEditor = () =>
  import('src/components/TiptapEditor').then(module => module.TiptapEditor);
const TiptapEditor = dynamic(importTiptapEditor, {
  loading: () => <ParagraphLoading>Loading text editor...</ParagraphLoading>,
});

// Prepare for converting URL text into link
const autolinker = new Autolinker({
  truncate: 25,
}); // https://github.com/gregjacobs/Autolinker.js#usage

export const SavedPlaces = ({mapObject}) => {
  const {places, setPlaces, userData, setUserData} = usePlaces();
  const {ui, selectedPlace, ripple} = places;

  const nightMode = useContext(NightModeContext);

  const [deleteUi, setDeleteUi] = useState(null);

  const viewportSize = useRef({height: null, width: null});
  useEffect(() => {
    viewportSize.current.height = window.visualViewport.height;
    viewportSize.current.width = window.visualViewport.width;
  });

  const markers = useRef([]);
  useEffect(() => {
    if (markers.current) {
      for (let i = 0; i < markers.current.length; i++) {
        markers.current[i].setMap(null); // remove the previous current location marker from the map
      }
    }
    const google = window.google;
    // Prepare for shaping markers
    const asterisk = {
      filePath: nightMode
        ? '/saved-place-mark-night.svg'
        : '/saved-place-mark-day.svg',
      height: 38.173, // copied from /public/saved-place-mark-*.svg
      width: 37.802, // copied from /public/saved-place-mark-*.svg
    };
    // Render a marker to each saved place
    for (let i = 0; i < userData.length; i++) {
      // Retrieve data to be used
      const userPlace = {
        id: userData[i].id,
        coordinates: {
          lat: userData[i].geometry.coordinates[1],
          lng: userData[i].geometry.coordinates[0],
        },
        name: userData[i].properties.name,
      };
      const marker = new google.maps.Marker({
        icon: {
          // Docs: https://developers.google.com/maps/documentation/javascript/reference/marker#Icon
          url: asterisk.filePath,
          anchor: new google.maps.Point(
            asterisk.width / 2,
            asterisk.height / 2,
          ), // to pin the icon at its center, rather than at its top-left (default)
        },
        optimized: false,
        position: userPlace.coordinates,
        title: userPlace.name,
      });
      // eslint-disable-next-line no-loop-func
      marker.addListener('click', () => {
        mapObject.panTo(userPlace.coordinates);
        mapObject.panBy(0, viewportSize.current.height / 4);
        setPlaces({
          ui: 'open',
          selectedPlace: {
            id: userPlace.id,
            coordinates: userPlace.coordinates,
          },
        });
      });
      marker.setMap(mapObject);
      markers.current.push(marker);
    }
  }, [mapObject, nightMode, setPlaces, userData]);

  const closePlaceInfo = ({
    rippleDiameter,
    ripplePositionLeft,
    ripplePositionTop,
  } = {}) => {
    mapObject.panTo(selectedPlace.coordinates);
    setPlaces({
      ui: 'closing',
      ripple: {
        diameter: rippleDiameter,
        positionLeft: ripplePositionLeft,
        positionTop: ripplePositionTop,
      },
    });
  };
  // change `status` from "closing" to "closed" once the closing animation is over
  const handleAnimationEnd = () => {
    if (ui === 'closing') {
      setPlaces({
        ui: null,
        selectedPlace: null,
        ripple: {
          diameter: null,
          positionLeft: null,
          positionTop: null,
        },
      });
    }
  };
  // For deleting the saved place
  const handleClickDelete = () => {
    setDeleteUi('confirm');
  };
  const cancelDelete = () => {
    setDeleteUi(null);
  };
  useEffect(() => {
    if (deleteUi === 'confirm') {
      document.body.style.overflow = 'hidden';
    }
    if (deleteUi === null) {
      document.body.style.overflow = 'auto';
    }
  }, [deleteUi]);

  // close place detail (or alert dialog) with Esc key
  const handleEsc = () => {
    if (deleteUi === 'confirm') {
      cancelDelete();
    } else {
      closePlaceInfo();
    }
  };
  useOnEscKeyDown({state: selectedPlace, handler: handleEsc});

  // close by clicking outside
  const dialogDiv = useRef(null);
  useOnClickOutside(dialogDiv, closePlaceInfo, {
    disable: deleteUi === 'confirm',
  });

  // For autofocusing the close button when opened
  const closeButton = useRef();
  useEffect(() => {
    if (ui === 'open') {
      closeButton.current.focusButton();
    }
  }, [ui]);

  if (selectedPlace) {
    // for rendering saved place info
    const selectedPlaceIndex = userData.findIndex(
      feature => feature.id === selectedPlace.id,
    );
    const selectedPlaceName = userData[selectedPlaceIndex].properties.name;
    let selectedPlaceNoteHtml;
    // if (typeof userData[selectedPlaceIndex].properties.note === 'string') {
    // Tiptap format
    selectedPlaceNoteHtml = DOMPurify.sanitize(
      userData[selectedPlaceIndex].properties.note,
      {ADD_ATTR: ['target']}, // see https://github.com/cure53/DOMPurify/issues/317#issuecomment-470429778
    );
    // } else {
    //   // Slate format
    //   const selectedPlaceNoteArray =
    //     userData[selectedPlaceIndex].properties.note;
    //   selectedPlaceNoteHtml = DOMPurify.sanitize(
    //     `<h2>${selectedPlaceName}</h2><div>${getHtmlFromSlate({
    //       children: selectedPlaceNoteArray,
    //     })}</div>`,
    //     {ADD_ATTR: ['target']}, // see https://github.com/cure53/DOMPurify/issues/317#issuecomment-470429778
    //   );
    // }
    const selectedPlaceUrl =
      userData[selectedPlaceIndex].properties['Google Maps URL'];
    const selectedPlaceAddress =
      userData[selectedPlaceIndex].properties.address;

    // Construct Directions URL
    const selectedPlaceOriginalName =
      userData[selectedPlaceIndex].properties['Google Maps place name'];
    const destination = selectedPlaceOriginalName
      ? encodeURIComponent(selectedPlaceOriginalName)
      : `${selectedPlace.coordinates.lat},${selectedPlace.coordinates.lng}`;
    const directionsURL = `https://www.google.com/maps/dir/?api=1&destination=${destination}&destination_id=${selectedPlace.id}`; // See Issue #122

    // for updating place info
    const handleResponse = jsonResponse => {
      const newUserData = [...userData];
      newUserData[selectedPlaceIndex].properties = {
        ...userData[selectedPlaceIndex].properties,
        ...jsonResponse.properties,
      };
      setUserData(newUserData);
      setPlaces({
        ui: 'open',
      });
    };
    // for deleting saved place
    const deletePlace = async () => {
      try {
        setDeleteUi('deleting');
        // TODO #282: handle database access error
        const response = await fetch('/api/places', {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: selectedPlace.id,
          }),
        });
        if (response.ok) {
          // // update user data
          const newUserData = userData.filter(
            place => place.id !== selectedPlace.id,
          );
          setDeleteUi(null);
          setPlaces({
            ui: null,
            selectedPlace: null,
          });
          setUserData(newUserData); // this must be executed after setPlaces(); otherwise the entire component re-renders and the `if(selectedPlace)` block will be run, returning an error.
        } else {
          throw new Error('DELETE request to /api/places has failed.');
        }
      } catch (error) {
        console.log(error);
      }
    };
    // UI rendering
    if (ui === 'open' || ui === 'closing') {
      return (
        <>
          <DivPlaceInfoBackground.Wrapper
            data-closing={ui === 'closing'}
            onAnimationEnd={handleAnimationEnd}
          >
            <DivPlaceInfoBackground
              aria-describedby="selected-place-detail"
              aria-hidden={deleteUi === 'confirm'}
              data-closing={ui === 'closing'}
              ref={dialogDiv}
              role="dialog"
            >
              <CloseButton
                ariaLabel={buttonLabel.closePlaceDetail}
                handleClick={closePlaceInfo}
                ref={closeButton}
                testId="close-button-saved-place"
              />
              <div id="selected-place-detail">
                <div
                  dangerouslySetInnerHTML={{
                    __html: autolinker.link(selectedPlaceNoteHtml),
                  }}
                />
                <p data-address>{selectedPlaceAddress}</p>
                <DivButtonsRow data-buttons-row>
                  <ButtonDialog
                    onClick={() => setPlaces({ui: 'editing'})}
                    onFocus={importTiptapEditor}
                    onMouseEnter={importTiptapEditor}
                    type="button"
                  >
                    {buttonLabel.edit}
                  </ButtonDialog>
                  <ButtonDialog
                    as="a"
                    data-reset-link-style
                    href={selectedPlaceUrl === '' ? false : selectedPlaceUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {linkText.searchedPlace}
                  </ButtonDialog>
                  <ButtonDialog
                    as="a"
                    data-reset-link-style
                    href={directionsURL}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {linkText.directions}
                  </ButtonDialog>
                </DivButtonsRow>
                <ButtonDialog onClick={handleClickDelete} type="button">
                  {buttonLabel.delete}
                </ButtonDialog>
              </div>
              {ui === 'closing' ? (
                <SpanRipple
                  id="ripple"
                  style={{
                    height: ripple.diameter,
                    left: ripple.positionLeft,
                    top: ripple.positionTop,
                    width: ripple.diameter,
                  }}
                />
              ) : null}
            </DivPlaceInfoBackground>
          </DivPlaceInfoBackground.Wrapper>

          {deleteUi === 'confirm' ? (
            <ClientOnlyPortal selector="#modal">
              <DivModalBackdrop>
                <FocusLock returnFocus>
                  <ComposeDialog
                    aria-describedby="confirm-delete-body"
                    aria-labelledby="confirm-delete-title"
                    aria-modal="true"
                    role="alertdialog"
                  >
                    <h2 id="confirm-delete-title">
                      {modal.delete.title(selectedPlaceName)}
                    </h2>
                    <p id="confirm-delete-body">
                      {modal.delete.body(selectedPlaceName)}
                    </p>
                    <ButtonDialog onClick={deletePlace} type="button">
                      {buttonLabel.delete}
                    </ButtonDialog>{' '}
                    <ButtonDialog
                      data-autofocus
                      onClick={cancelDelete}
                      type="button"
                    >
                      {buttonLabel.cancel}
                    </ButtonDialog>{' '}
                  </ComposeDialog>
                </FocusLock>
              </DivModalBackdrop>
            </ClientOnlyPortal>
          ) : deleteUi === 'deleting' ? (
            <DivCloud data-delete>
              <ParagraphLoading>
                {loadingMessage.delete(selectedPlaceName)}
              </ParagraphLoading>
            </DivCloud>
          ) : null}
        </>
      );
    } else if (ui === 'editing') {
      return (
        <FocusLock returnFocus>
          <DivPlaceInfoBackground.Wrapper data-fullscreen>
            <DivPlaceInfoBackground
              aria-labelledby="editor-heading"
              data-fullscreen
              role="dialog"
            >
              <TiptapEditor
                data={{
                  id: selectedPlace.id,
                  name: selectedPlaceName, // to be removed once Slate is completely removed
                  html: selectedPlaceNoteHtml,
                  address: selectedPlaceAddress,
                  url: selectedPlaceUrl,
                }}
                handleCancel={() => setPlaces({ui: 'open'})}
                handleResponse={handleResponse}
                setUi={setPlaces}
              />
            </DivPlaceInfoBackground>
          </DivPlaceInfoBackground.Wrapper>
        </FocusLock>
      );
    } else if (ui === 'saving') {
      return (
        <DivPlaceInfoBackground.Wrapper data-fullscreen>
          <DivPlaceInfoBackground
            aria-labelledby="saving-changes"
            data-fullscreen
            role="dialog"
          >
            <ParagraphLoading id="saving-changes">
              {loadingMessage.update}
            </ParagraphLoading>
          </DivPlaceInfoBackground>
        </DivPlaceInfoBackground.Wrapper>
      );
    }
  }

  return null;
};

SavedPlaces.propTypes = {
  mapObject: PropTypes.object,
};
