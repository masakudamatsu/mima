import {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import {NightModeContext} from 'src/wrappers/NightModeContext';
import {PlaceIdContext} from 'src/wrappers/PlaceIdContext';

import {CloseButton} from './CloseButton';
import {ComposeDialog} from 'src/elements/ComposeDialog';

import {useOnClickOutside} from 'src/hooks/useOnClickOutside';

import {buttonLabel, linkText} from 'src/utils/uiCopies';
import {duration} from 'src/utils/designtokens';

export const SearchedPlace = ({mapObject}) => {
  const [placeData, setPlaceData] = useState(null);
  const [placeId] = useContext(PlaceIdContext);
  const nightMode = useContext(NightModeContext);

  const viewportSize = useRef({height: null, width: null});
  useEffect(() => {
    viewportSize.current.height = window.visualViewport.height;
    viewportSize.current.width = window.visualViewport.width;
  });

  const searchedPlace = useRef();
  useEffect(() => {
    if (!placeId) return;
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
    service.getDetails(request, callback);
    function callback(place, status) {
      if (status !== 'OK' || !place) {
        // TODO #199: Handle error more properly
        console.error('Google Maps Place Details API call has failed.');
      }
      // Retrieve data to be used
      searchedPlace.current = {
        address: place.formatted_address,
        // TODO #197 businessStatus: place.business_status,
        coordinates: new google.maps.LatLng(
          place.geometry.location.lat(),
          place.geometry.location.lng(),
        ),
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
      const marker = new google.maps.Marker({
        icon: {
          ...shapedAsPlusSign,
          ...pinnedAtCenter,
          ...colored,
          ...scaled,
        },
        optimized: false,
        position: searchedPlace.current.coordinates,
        title: searchedPlace.current.name,
      });
      // eslint-disable-next-line no-loop-func
      marker.addListener('click', () => {
        mapObject.panTo(searchedPlace.current.coordinates);
        mapObject.panBy(0, viewportSize.current.height / 6);
        setPlaceData(searchedPlace.current);
      });

      // render marker
      marker.setMap(mapObject);
      // snap the map to the marker
      mapObject.panTo(searchedPlace.current.coordinates);
      mapObject.panBy(0, viewportSize.current.height / 6);
      setPlaceData(searchedPlace.current);
    }
  }, [mapObject, nightMode, placeId]);

  // For autofocusing the close button when opened
  const closeButton = useRef();
  useEffect(() => {
    if (placeData) {
      closeButton.current.focusButton();
    }
  }, [placeData]);

  // handle clicking the close button
  const [closing, setClosing] = useState(false);
  const closePlaceInfo = () => {
    mapObject.panTo(placeData.coordinates);
    setClosing(true);
  };
  useEffect(() => {
    if (closing === true) {
      setTimeout(() => {
        setPlaceData(null);
        setClosing(false);
      }, duration.modal.exit);
    }
  }, [closing]);

  // close by clicking outside
  const dialogDiv = useRef(null);
  useOnClickOutside(dialogDiv, closePlaceInfo);

  const placeNameId = 'place-name';
  const placeDetailId = 'place-detail';

  return placeData ? (
    <ComposeDialog // role="dialog" included
      aria-describedby={placeDetailId}
      aria-labelledby={placeNameId}
      data-closing={closing}
      ref={dialogDiv}
    >
      <CloseButton
        ariaLabel={buttonLabel.closePlaceDetail}
        handleClick={closePlaceInfo}
        ref={closeButton}
        testId="close-button-saved-place"
      />
      <h2 id={placeNameId}>{placeData.name}</h2>
      <div id={placeDetailId}>
        <p>{placeData.address}</p>
        <p>
          <a href={placeData.url} rel="noreferrer" target="_blank">
            {linkText.searchedPlace}
          </a>
        </p>
      </div>
    </ComposeDialog>
  ) : null;
};
SearchedPlace.propTypes = {
  mapObject: PropTypes.object,
};
