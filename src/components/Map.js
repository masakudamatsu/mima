import {useContext, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

import {NightModeContext} from 'src/wrappers/NightModeContext';
import {map as mapColor} from 'src/utils/designtokens';

import styled from 'styled-components';
const drawMapFullscreen = `
  height: 100%;
`;
const createStackingContext = `
  isolation: isolate;
`; // Without stacking context, full-screen scrim won't be able to disable the clicking of Google Logo (z-index: 1000000) and buttons at the bottom-right corners (z-index: 1000001)

const Div = styled.div.attrs({
  id: 'map', // for Firefox's -moz-element() function
})`
  ${drawMapFullscreen}
  ${createStackingContext}
`;
const mapIdDaytime = '83a67631594fbfff';
const mapIdNighttime = '2c8123c7734d3fb';

export const Map = ({setMapObject}) => {
  const nightMode = useContext(NightModeContext);
  const mapEmbedder = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    const google = window.google;
    const colorLoadingScreen = {
      backgroundColor: nightMode
        ? mapColor.cityblocks.night
        : mapColor.cityblocks.day,
    };
    const initialView = {
      center: {
        // Kiyamachi Rokkaku
        lat: 35.006063,
        lng: 135.769922,
      },
      zoom: 18, // to see the accuracy range circle of the current location
    };
    const colorCustomized = {
      mapId: nightMode ? mapIdNighttime : mapIdDaytime,
    };
    const buttonsDisabled = {
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: false,
    };
    mapInstance.current = new google.maps.Map(mapEmbedder.current, {
      ...colorLoadingScreen,
      ...initialView,
      ...colorCustomized,
      ...buttonsDisabled,
    });
    setMapObject(mapInstance.current);
  }, [nightMode, setMapObject]);

  return <Div ref={mapEmbedder} />;
};

Map.propTypes = {
  setMapObject: PropTypes.func.isRequired,
};
