import {useContext, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

import {NightModeContext} from 'src/wrappers/NightModeContext';
import {PlaceIdContext} from 'src/wrappers/PlaceIdContext';

import {CloseButton} from './CloseButton';
import {ComposeDialog} from 'src/elements/ComposeDialog';

import {useOnClickOutside} from 'src/hooks/useOnClickOutside';
import {useOnEscKeyDown} from 'src/hooks/useOnEscKeyDown';
import {useStateObject} from 'src/hooks/useStateObject';

import {buttonLabel, linkText} from 'src/utils/uiCopies';
import {duration} from 'src/utils/designtokens';

export const SearchedPlace = ({mapObject}) => {
  const [placeId] = useContext(PlaceIdContext);
  const nightMode = useContext(NightModeContext);

  const [state, setState] = useStateObject({
    status: 'initial',
    placeData: null,
    error: null,
  });
  const {status, placeData, error} = state;

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
        mapObject.panBy(0, viewportSize.current.height / 6);
        setState({status: 'open'});
      });

      // render marker
      marker.current.setMap(mapObject);
      // snap the map to the marker
      mapObject.panTo(searchedPlace.coordinates);
      mapObject.panBy(0, viewportSize.current.height / 6);
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
  const closePlaceInfo = () => {
    mapObject.panTo(placeData.coordinates);
    setState({status: 'closing'});
  };
  useEffect(() => {
    if (status === 'closing') {
      setTimeout(() => {
        setState({status: 'closed'});
      }, duration.modal.exit);
    }
  }, [status, setState]);

  // close by clicking outside
  const dialogDiv = useRef(null);
  useOnClickOutside(dialogDiv, closePlaceInfo);

  // close by ESC key
  useOnEscKeyDown({
    state: status === 'open',
    handler: closePlaceInfo,
  });

  const placeNameId = 'place-name';
  const placeDetailId = 'place-detail';

  if (status === 'initial') {
    return null;
  } else if (status === 'loading') {
    return null; // TODO #208: render loading spinner or its equivalent
  } else if (status === 'error') {
    return null; // TODO #199: Handle error properly
  } else if (status === 'open' || status === 'closing') {
    return (
      <ComposeDialog // role="dialog" included
        aria-describedby={placeDetailId}
        aria-labelledby={placeNameId}
        data-closing={status === 'closing'}
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
    );
  } else if (status === 'closed') {
    return null;
  }
};

SearchedPlace.propTypes = {
  mapObject: PropTypes.object,
};
