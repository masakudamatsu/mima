import React from 'react';
import {SavePlaceButton} from './SavePlaceButton';

import {NightModeContext} from 'src/context/NightModeContext';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'SavePlaceButton component',
  component: SavePlaceButton,
  parameters: {
    backgrounds: {
      default: 'white',
      values: [
        {name: 'white', value: '#fff'},
        {name: 'black', value: '#2b2b2b'},
      ],
    },
  },
};

// Night mode
function SavePlaceButtonAtDay() {
  return (
    <NightModeContext.Provider value={false}>
      <SavePlaceButton />
    </NightModeContext.Provider>
  );
}

export function DefaultStyle() {
  return <SavePlaceButtonAtDay />;
}

export function FocusStyle() {
  return <SavePlaceButtonAtDay />;
}
FocusStyle.parameters = {pseudo: {focus: true}};

export function HoverStyle() {
  return <SavePlaceButtonAtDay />;
}
HoverStyle.parameters = {pseudo: {hover: true}};

export function ActiveStyle() {
  return <SavePlaceButtonAtDay />;
}
ActiveStyle.parameters = {pseudo: {active: true}};

// Night mode
function SavePlaceButtonAtNight() {
  return (
    <NightModeContext.Provider value={true}>
      <SavePlaceButton />
    </NightModeContext.Provider>
  );
}

export function NightModeStyle() {
  return <SavePlaceButtonAtNight />;
}
NightModeStyle.parameters = {
  backgrounds: {
    default: 'black',
  },
};

export function NightModeFocusStyle() {
  return <SavePlaceButtonAtNight />;
}
NightModeFocusStyle.parameters = {
  backgrounds: {
    default: 'black',
  },
  pseudo: {focus: true},
};

export function NightModeHoverStyle() {
  return <SavePlaceButtonAtNight />;
}
NightModeHoverStyle.parameters = {
  backgrounds: {
    default: 'black',
  },
  pseudo: {hover: true},
};

export function NightModeActiveStyle() {
  return <SavePlaceButtonAtNight />;
}
NightModeActiveStyle.parameters = {
  backgrounds: {
    default: 'black',
  },
  pseudo: {active: true},
};
