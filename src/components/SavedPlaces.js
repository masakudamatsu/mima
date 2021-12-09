import {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

import savedPlaces from 'src/utils/savedPlaces.json';

import {PlaceInfo} from 'src/components/PlaceInfo';

import {useSessionStorageState} from 'src/hooks/useSessionStorageState';
import {useOnEscKeyDown} from 'src/hooks/useOnEscKeyDown';
import {getHtmlFromSlate} from 'src/utils/getHtmlFromSlate';
import {NightModeContext} from 'src/wrappers/NightModeContext';

import dynamic from 'next/dynamic';
const importPlaceInfoEditor = () =>
  import('src/components/PlaceInfoEditor').then(
    module => module.PlaceInfoEditor,
  );
const PlaceInfoEditor = dynamic(importPlaceInfoEditor);

export const SavedPlaces = ({mapObject}) => {
  const [userData, setUserData] = useSessionStorageState(
    'userData',
    savedPlaces,
  );

  const nightMode = useContext(NightModeContext);

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const viewportSize = useRef({height: null, width: null});
  useEffect(() => {
    viewportSize.current.height = window.visualViewport.height;
    viewportSize.current.width = window.visualViewport.width;
  });

  useEffect(() => {
    const google = window.google;
    // Shape markers
    const cormorantBoldAsterisk = {
      height: 38.136,
      path:
        'M 37.598 21.2 L 20.098 18.5 A 0.223 0.223 0 0 1 19.953 18.442 Q 19.872 18.374 19.801 18.226 A 1.561 1.561 0 0 1 19.748 18.1 A 0.969 0.969 0 0 1 19.72 18.014 Q 19.643 17.729 19.837 17.626 A 0.396 0.396 0 0 1 19.898 17.6 L 31.198 11.1 A 0.656 0.656 0 0 1 31.467 11.044 Q 32.344 11.044 33.848 13.15 Q 35.598 15.6 36.898 18.45 A 31.297 31.297 0 0 1 37.195 19.119 Q 38.087 21.203 37.637 21.203 A 0.235 0.235 0 0 1 37.598 21.2 Z M 15.498 17.8 L 2.398 16.3 Q 1.598 16.122 1.509 13.888 A 14.869 14.869 0 0 1 1.498 13.3 A 27.715 27.715 0 0 1 1.704 10.008 A 35.748 35.748 0 0 1 2.148 7.25 Q 2.776 4.109 3.264 4.471 A 0.303 0.303 0 0 1 3.298 4.5 L 15.798 16.9 Q 15.998 17.1 15.848 17.5 Q 15.707 17.876 15.522 17.81 A 0.212 0.212 0 0 1 15.498 17.8 Z M 0.098 27.8 L 15.698 19.8 L 15.898 19.7 A 0.71 0.71 0 0 1 16.312 19.835 A 1.012 1.012 0 0 1 16.448 19.95 Q 16.698 20.2 16.598 20.4 L 11.098 32.3 A 0.333 0.333 0 0 1 10.939 32.483 Q 10.796 32.565 10.537 32.59 A 2.552 2.552 0 0 1 10.298 32.6 A 4.849 4.849 0 0 1 9.486 32.522 Q 8.662 32.38 7.508 31.982 A 27.544 27.544 0 0 1 6.348 31.55 A 34.706 34.706 0 0 1 3.629 30.342 A 26.81 26.81 0 0 1 1.648 29.25 Q -0.327 28.046 0.065 27.816 A 0.247 0.247 0 0 1 0.098 27.8 Z M 17.698 16 L 15.098 3.2 A 0.591 0.591 0 0 1 15.088 3.094 Q 15.088 2.049 18.848 1.05 A 39.76 39.76 0 0 1 21.416 0.452 Q 22.679 0.205 23.782 0.093 A 17.021 17.021 0 0 1 25.498 0 Q 26.687 0 26.6 0.392 A 0.286 0.286 0 0 1 26.598 0.4 L 18.698 16 Q 18.609 16.266 18.245 16.296 A 1.182 1.182 0 0 1 18.148 16.3 Q 17.715 16.3 17.699 16.022 A 0.379 0.379 0 0 1 17.698 16 Z M 21.198 38 L 18.298 20.8 L 18.298 20.7 A 0.26 0.26 0 0 1 18.338 20.568 Q 18.425 20.421 18.698 20.25 Q 19.098 20 19.198 20.1 L 28.798 29 A 0.559 0.559 0 0 1 28.987 29.367 Q 29.078 30.056 28.023 31.593 A 17.385 17.385 0 0 1 27.698 32.05 Q 25.898 34.5 23.598 36.55 A 29.312 29.312 0 0 1 23.025 37.048 Q 21.492 38.345 21.242 38.096 A 0.171 0.171 0 0 1 21.198 38 Z',
      width: 37.788,
    }; // obtained from https://danmarshall.github.io/google-font-to-svg-path/
    const shapedAsAsterisk = {
      path: cormorantBoldAsterisk.path,
    };
    const pinnedAtCenter = {
      anchor: new google.maps.Point(
        cormorantBoldAsterisk.width / 2,
        cormorantBoldAsterisk.height / 2,
      ), // to pin the icon at its center, rather than at its top-left (default)
    };

    // Color markers
    const yellow = nightMode
      ? {
          fillColor: '#dfa513', // hue 42; chroma 80; luminance 9.53
          strokeColor: '#efdba7', // hue 42; chroma 28.24; luminance 15.36
        }
      : {
          fillColor: '#f6d410', // 51, 90.2, 14.34
          strokeColor: '#463c01', // 51, 27.06, 1.93
        };
    const colored = {
      fillOpacity: 1, // to disable the default value of 0
      ...yellow,
    };

    // Drop a marker to each saved place
    for (let i = 0; i < userData.features.length; i++) {
      // Retrieve data to be used
      const userPlace = {
        id: userData.features[i].properties.id,
        coordinates: new google.maps.LatLng(
          userData.features[i].geometry.coordinates[1],
          userData.features[i].geometry.coordinates[0],
        ),
        name: userData.features[i].properties.name,
      };
      const marker = new google.maps.Marker({
        icon: {
          ...shapedAsAsterisk,
          ...pinnedAtCenter,
          ...colored,
        },
        optimized: false,
        position: userPlace.coordinates,
        title: userPlace.name,
      });
      // eslint-disable-next-line no-loop-func
      marker.addListener('click', () => {
        mapObject.panTo(userPlace.coordinates);
        mapObject.panBy(0, viewportSize.current.height / 6);
        setSelectedPlace({
          id: userPlace.id,
          coordinates: userPlace.coordinates,
          marker: marker,
        });
      });
      marker.setMap(mapObject);
    }
  }, [mapObject, nightMode, userData.features]);

  const closePlaceInfo = () => {
    mapObject.panTo(selectedPlace.coordinates);
    setSelectedPlace(null);
  };

  // close with Esc key
  useOnEscKeyDown(selectedPlace, closePlaceInfo);

  if (selectedPlace) {
    const selectedPlaceIndex = userData.features.findIndex(
      feature => feature.properties.id === selectedPlace.id,
    );
    const selectedPlaceName =
      userData.features[selectedPlaceIndex].properties.name;
    const selectedPlaceNoteArray =
      userData.features[selectedPlaceIndex].properties.note;
    const selectedPlaceNoteHtml = DOMPurify.sanitize(
      getHtmlFromSlate({children: selectedPlaceNoteArray}),
    );

    const updateData = ([newTitle, newNoteArray]) => {
      const newData = {
        name: newTitle.children[0].text,
        note: newNoteArray,
      };
      // update place marker's accessible name
      selectedPlace.marker.setTitle(newData.name);
      // // update user data
      const newUserData = {...userData};
      newUserData.features[selectedPlaceIndex].properties = {
        ...userData.features[selectedPlaceIndex].properties,
        ...newData,
      };
      setUserData(newUserData);
    };

    return editMode ? (
      <PlaceInfoEditor
        placeName={selectedPlaceName}
        placeNoteArray={selectedPlaceNoteArray}
        setEditMode={setEditMode}
        updateData={updateData}
      />
    ) : (
      <PlaceInfo
        closePlaceInfo={closePlaceInfo}
        importPlaceInfoEditor={importPlaceInfoEditor}
        placeName={selectedPlaceName}
        placeNoteHtml={selectedPlaceNoteHtml}
        setEditMode={setEditMode}
      />
    );
  }

  return null;
};

SavedPlaces.propTypes = {
  mapObject: PropTypes.object,
};
