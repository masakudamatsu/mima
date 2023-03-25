import {useContext, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import FocusLock from 'react-focus-lock';

import {NightModeContext} from 'src/wrappers/NightModeContext';
import {PlaceIdContext} from 'src/wrappers/PlaceIdContext';

import {ButtonDialog} from 'src/elements/ButtonDialog';
import {CloseButton} from './CloseButton';
import {DivPlaceInfoBackground} from 'src/elements/DivPlaceInfoBackground';
import {ParagraphLoading} from 'src/elements/ParagraphLoading';
import {SpanRipple} from 'src/elements/SpanRipple';

import {useOnClickOutside} from 'src/hooks/useOnClickOutside';
import {useOnEscKeyDown} from 'src/hooks/useOnEscKeyDown';
import {usePlaces} from './Places';
import {useStateObject} from 'src/hooks/useStateObject';

import {buttonLabel, linkText, loadingMessage} from 'src/utils/uiCopies';

// import Tiptap only when necessary
import dynamic from 'next/dynamic';
const importTiptapEditor = () =>
  import('src/components/TiptapEditor').then(module => module.TiptapEditor);
const TiptapEditor = dynamic(importTiptapEditor, {
  loading: () => <ParagraphLoading>Loading text editor...</ParagraphLoading>,
});

export const SearchedPlace = ({mapObject}) => {
  const [placeId, setPlaceId] = useContext(PlaceIdContext);
  const nightMode = useContext(NightModeContext);

  const {setPlaces, userData, setUserData} = usePlaces();

  const [state, setState] = useStateObject({
    status: 'closed',
    placeData: null,
    error: null,
    ripple: {
      diameter: null,
      positionLeft: null,
      positionRight: null,
    },
  });
  const {status, placeData, error, ripple} = state;

  const viewportSize = useRef({height: null, width: null});
  useEffect(() => {
    viewportSize.current.height = window.visualViewport.height;
    viewportSize.current.width = window.visualViewport.width;
  });

  const marker = useRef();
  useEffect(() => {
    if (!placeId) return;
    setState({status: 'loading'});
    if (marker.current) {
      marker.current.setMap(null); // remove the previous current location marker from the map
    }
    const google = window.google;
    const service = new google.maps.places.PlacesService(mapObject);
    const request = {
      placeId: placeId,
      fields: [
        'name',
        'geometry',
        'formatted_address',
        'url',
        'business_status',
      ],
    };
    service.getDetails(request, handleResponse);
    function handleResponse(place, status) {
      if (status !== 'OK' || !place) {
        // TODO #199: Handle error more properly
        console.error('Google Maps Place Details API call has failed.');
        setState({status: 'error', error: status});
      }
      // Retrieve data to be used
      const searchedPlace = {
        address: place.formatted_address,
        // TODO #197 businessStatus: place.business_status,
        coordinates: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
        name: place.name,
        url: place.url,
      };

      // style marker
      const plusSignIcon = {
        // source: Material Icons Add: https://fonts.google.com/icons?selected=Material%20Icons%20Outlined%3Aadd%3A
        height: 24,
        path: `
          M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z
        `,
        width: 24,
      };
      const shapedAsPlusSign = {
        path: plusSignIcon.path,
      };
      const pinnedAtCenter = {
        anchor: new google.maps.Point(
          plusSignIcon.width / 2,
          plusSignIcon.height / 2,
        ), // to pin the icon at its center, rather than at its top-left (default)
      };
      const peach = nightMode
        ? {
            fillColor: '#e31081', // hue 328; chroma 82.75; luminance 4.66
            strokeColor: '#fed0e8', // hue 329; chroma 18.04; luminance 15.4
          }
        : {
            fillColor: '#cf5673', // hue 346, chroma 47.45, luminance 5.23
            strokeColor: '#82001c', // hue 347, chroma 50.98, luminance 1.97
          };
      const colored = {
        fillOpacity: 1, // to disable the default value of 0
        ...peach,
      };
      const scaled = {
        scale: 2,
      };
      marker.current = new google.maps.Marker({
        icon: {
          ...shapedAsPlusSign,
          ...pinnedAtCenter,
          ...colored,
          ...scaled,
        },
        optimized: false,
        position: searchedPlace.coordinates,
        title: searchedPlace.name,
      });
      // eslint-disable-next-line no-loop-func
      marker.current.addListener('click', () => {
        mapObject.panTo(searchedPlace.coordinates);
        mapObject.panBy(0, viewportSize.current.height / 4);
        setState({status: 'open'});
      });

      // render marker
      marker.current.setMap(mapObject);
      // snap the map to the marker
      mapObject.panTo(searchedPlace.coordinates);
      mapObject.panBy(0, viewportSize.current.height / 4);
      setState({status: 'open', placeData: searchedPlace});
    }
  }, [mapObject, nightMode, placeId, setState]);

  // For autofocusing the close button when opened
  const closeButton = useRef();
  useEffect(() => {
    if (status === 'open') {
      closeButton.current.focusButton();
    }
  }, [status]);

  // handle clicking the close button
  const closePlaceInfo = ({
    rippleDiameter,
    ripplePositionLeft,
    ripplePositionTop,
  } = {}) => {
    mapObject.panTo(placeData.coordinates);
    setState({
      status: 'closing',
      ripple: {
        diameter: rippleDiameter,
        positionLeft: ripplePositionLeft,
        positionTop: ripplePositionTop,
      },
    });
  };
  // change `status` from "closing" to "closed" once the closing animation is over
  const handleAnimationEnd = () => {
    if (status === 'closing') {
      setState({
        status: 'closed',
        ripple: {
          diameter: null,
          positionLeft: null,
          positionTop: null,
        },
      });
    }
  };

  // close by clicking outside
  const dialogDiv = useRef(null);
  useOnClickOutside(dialogDiv, closePlaceInfo);

  // close by ESC key
  useOnEscKeyDown({
    state: status === 'open',
    handler: closePlaceInfo,
  });

  // for saving the searched place
  const openEditor = () => {
    setState({status: 'editing'});
  };
  const handleCancel = () => {
    setState({status: 'open'});
  };
  const handleResponse = jsonResponse => {
    marker.current.setMap(null); // remove the searched place marker
    setUserData([...userData, jsonResponse]);
    setPlaceId('');
    setState({status: 'closed'});
    setPlaces({
      ui: 'open',
      selectedPlace: {
        id: jsonResponse.id,
        coordinates: {
          lat: jsonResponse.geometry.coordinates[1],
          lng: jsonResponse.geometry.coordinates[0],
        },
      },
    });
  };

  if (status === 'closed') {
    return null;
  } else if (status === 'loading') {
    return null; // TODO #208: render loading spinner or its equivalent
  } else if (status === 'error') {
    return null; // TODO #199: Handle error properly
  } else if (status === 'open' || status === 'closing') {
    return (
      <DivPlaceInfoBackground.Wrapper
        data-closing={status === 'closing'}
        onAnimationEnd={handleAnimationEnd}
      >
        <DivPlaceInfoBackground
          aria-describedby="place-detail"
          data-closing={status === 'closing'}
          ref={dialogDiv}
          role="dialog"
        >
          <CloseButton
            ariaLabel={buttonLabel.closePlaceDetail}
            handleClick={closePlaceInfo}
            ref={closeButton}
            testId="close-button-saved-place"
          />
          <div id="place-detail">
            <h2>{placeData.name}</h2>
            <div>
              <p>{placeData.address}</p>
              <p>
                <a href={placeData.url} rel="noreferrer" target="_blank">
                  {linkText.searchedPlace}
                </a>
              </p>
            </div>
            <ButtonDialog
              onClick={openEditor}
              onFocus={importTiptapEditor}
              onMouseEnter={importTiptapEditor}
              type="button"
            >
              {buttonLabel.saveSearchedPlace}
            </ButtonDialog>
          </div>
          {status === 'closing' ? (
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
    );
  } else if (status === 'editing') {
    return (
      <FocusLock returnFocus>
        <DivPlaceInfoBackground.Wrapper data-fullscreen>
          <DivPlaceInfoBackground
            // aria-describedby="selected-place-detail"
            aria-labelledby="edit-place-info"
            data-fullscreen
            role="dialog"
          >
            <TiptapEditor
              data={{
                lat: placeData.coordinates.lat,
                lng: placeData.coordinates.lng,
                name: placeData.name,
                address: placeData.address,
                url: placeData.url,
                linkText: linkText.searchedPlace,
              }}
              handleCancel={handleCancel}
              handleResponse={handleResponse}
              searchedPlace
              setUi={setState}
            />
          </DivPlaceInfoBackground>
        </DivPlaceInfoBackground.Wrapper>
      </FocusLock>
    );
  } else if (status === 'saving') {
    return (
      <DivPlaceInfoBackground.Wrapper data-fullscreen>
        <DivPlaceInfoBackground
          aria-labelledby="saving-place"
          data-fullscreen
          role="dialog"
        >
          <ParagraphLoading id="saving-place">
            {loadingMessage.create}
          </ParagraphLoading>
        </DivPlaceInfoBackground>
      </DivPlaceInfoBackground.Wrapper>
    );
  }
};

SearchedPlace.propTypes = {
  mapObject: PropTypes.object,
};
