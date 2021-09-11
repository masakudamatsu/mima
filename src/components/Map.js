import {useEffect, useRef} from 'react';
import {Loader} from '@googlemaps/js-api-loader';
import PropTypes from 'prop-types';

import DivMap from 'src/elements/DivMap';

import userData from 'src/utils/mockUserData.json';

const mapIdDaytime = '83a67631594fbfff';
const mapIdNighttime = '2c8123c7734d3fb';

const cormorantBoldAsterisk = {
  height: 38.136,
  path:
    'M 37.598 21.2 L 20.098 18.5 A 0.223 0.223 0 0 1 19.953 18.442 Q 19.872 18.374 19.801 18.226 A 1.561 1.561 0 0 1 19.748 18.1 A 0.969 0.969 0 0 1 19.72 18.014 Q 19.643 17.729 19.837 17.626 A 0.396 0.396 0 0 1 19.898 17.6 L 31.198 11.1 A 0.656 0.656 0 0 1 31.467 11.044 Q 32.344 11.044 33.848 13.15 Q 35.598 15.6 36.898 18.45 A 31.297 31.297 0 0 1 37.195 19.119 Q 38.087 21.203 37.637 21.203 A 0.235 0.235 0 0 1 37.598 21.2 Z M 15.498 17.8 L 2.398 16.3 Q 1.598 16.122 1.509 13.888 A 14.869 14.869 0 0 1 1.498 13.3 A 27.715 27.715 0 0 1 1.704 10.008 A 35.748 35.748 0 0 1 2.148 7.25 Q 2.776 4.109 3.264 4.471 A 0.303 0.303 0 0 1 3.298 4.5 L 15.798 16.9 Q 15.998 17.1 15.848 17.5 Q 15.707 17.876 15.522 17.81 A 0.212 0.212 0 0 1 15.498 17.8 Z M 0.098 27.8 L 15.698 19.8 L 15.898 19.7 A 0.71 0.71 0 0 1 16.312 19.835 A 1.012 1.012 0 0 1 16.448 19.95 Q 16.698 20.2 16.598 20.4 L 11.098 32.3 A 0.333 0.333 0 0 1 10.939 32.483 Q 10.796 32.565 10.537 32.59 A 2.552 2.552 0 0 1 10.298 32.6 A 4.849 4.849 0 0 1 9.486 32.522 Q 8.662 32.38 7.508 31.982 A 27.544 27.544 0 0 1 6.348 31.55 A 34.706 34.706 0 0 1 3.629 30.342 A 26.81 26.81 0 0 1 1.648 29.25 Q -0.327 28.046 0.065 27.816 A 0.247 0.247 0 0 1 0.098 27.8 Z M 17.698 16 L 15.098 3.2 A 0.591 0.591 0 0 1 15.088 3.094 Q 15.088 2.049 18.848 1.05 A 39.76 39.76 0 0 1 21.416 0.452 Q 22.679 0.205 23.782 0.093 A 17.021 17.021 0 0 1 25.498 0 Q 26.687 0 26.6 0.392 A 0.286 0.286 0 0 1 26.598 0.4 L 18.698 16 Q 18.609 16.266 18.245 16.296 A 1.182 1.182 0 0 1 18.148 16.3 Q 17.715 16.3 17.699 16.022 A 0.379 0.379 0 0 1 17.698 16 Z M 21.198 38 L 18.298 20.8 L 18.298 20.7 A 0.26 0.26 0 0 1 18.338 20.568 Q 18.425 20.421 18.698 20.25 Q 19.098 20 19.198 20.1 L 28.798 29 A 0.559 0.559 0 0 1 28.987 29.367 Q 29.078 30.056 28.023 31.593 A 17.385 17.385 0 0 1 27.698 32.05 Q 25.898 34.5 23.598 36.55 A 29.312 29.312 0 0 1 23.025 37.048 Q 21.492 38.345 21.242 38.096 A 0.171 0.171 0 0 1 21.198 38 Z',
  width: 37.788,
}; // obtained from https://danmarshall.github.io/google-font-to-svg-path/

const Map = ({nightMode}) => {
  const googlemap = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      version: 'weekly',
    });

    let map; // in response to ESLint warning: "Assignments to the 'map' variable from inside React Hook use Effect will be lost after each render. To preserve the value over time, store it in a useRef Hook and keep the mutable value in the '.current' property. Oth erwise, you can move this variable directly inside useEffect"
    loader.load().then(() => {
      const google = window.google;
      map = new google.maps.Map(googlemap.current, {
        center: {lat: 35.011636, lng: 135.768029}, // Kyoto (https://www.countrycoordinate.com/city-kyoto-japan/)
        zoom: 17,
        mapId: nightMode ? mapIdNighttime : mapIdDaytime,
        // Disable the default UI control buttons
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
      });
      // Add markers
      const blue = nightMode
        ? {
            fillColor: '#0d55d9', // hue 219; chroma 80; luminance 3.32
            strokeColor: '#cedfff', // hue 219; chroma 19.22; luminance 15.62
          }
        : {
            fillColor: '#116df6', // hue 216; chroma 89.8; luminance 4.54
            strokeColor: '#013789', // hue 216; chroma 53.33; luminance 1.91
          };
      const green = nightMode
        ? {
            fillColor: '#addd11', // hue 74; chroma 80; luminance 13.13
            strokeColor: '#ebffad', // hue 74; chroma 32.16; luminance 19.44
          }
        : {
            fillColor: '#8ef913', // hue 88; chroma 90.2; luminance 15.71
            strokeColor: '#264700', // hue 88; chroma 27.84; luminance 1.98
          };
      const orange = nightMode
        ? {
            fillColor: '#d8430c', // hue 16; chroma 80; luminance 4.78
            strokeColor: '#fcd4c4', // hue 16; chroma 21.96; luminance 15.35
          }
        : {
            fillColor: '#f54c0f', // hue 16; chroma 90.2; luminance 5.92
            strokeColor: '#751f00', // hue 16; chroma 45.88; luminance 1.95
          };
      const purple = nightMode
        ? {
            fillColor: '#d50972', // hue 329; chroma 80; luminance 4.11 (if chroma is 90, it looks similar to #e90b03, the night mode orange)
            strokeColor: '#fad2e7', // hue 329; chroma 15.69; luminance 15.44
          }
        : {
            fillColor: '#980ff4', // hue 276; chroma 89.8; luminance 3.71
            strokeColor: '#5c0695', // hue 276; chroma 56.08; luminance 1.92
          };
      const yellow = nightMode
        ? {
            fillColor: '#dfa513', // hue 42; chroma 80; luminance 9.53
            strokeColor: '#efdba7', // hue 42; chroma 28.24; luminance 15.36
          }
        : {
            fillColor: '#fcc319', // hue 45; chroma 89.02; luminance 12.96
            strokeColor: '#4f3b00', // hue 54; chroma 30.98; luminance 1.96
          };
      for (let i = 0; i < userData.places.length; i++) {
        const userPlace = userData.places[i];
        let color;
        switch (userPlace.tag[0]) {
          case 'bar':
            color = purple;
            break;
          case 'breakfast':
            color = blue;
            break;
          case 'cafe':
            color = green;
            break;
          case 'dinner':
            color = orange;
            break;
          case 'lunch':
            color = yellow;
            break;
          default:
            color = {
              fillColor: '#fff',
              strokeColor: '#000',
            };
            break;
        }
        new google.maps.Marker({
          icon: {
            ...color,
            anchor: new google.maps.Point(
              cormorantBoldAsterisk.width / 2,
              cormorantBoldAsterisk.height / 2,
            ), // to pin the icon at its center, rather than at its top-left (default)
            fillOpacity: 1,
            path: cormorantBoldAsterisk.path,
          },
          map: map,
          position: {
            lat: userPlace.latitude,
            lng: userPlace.longitude,
          },
          title: userPlace.name,
        });
      }
    });
  }, [nightMode]);

  return <DivMap ref={googlemap} />;
};

Map.propTypes = {
  nightMode: PropTypes.bool,
};

export default Map;
