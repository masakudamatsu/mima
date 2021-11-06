import React from 'react';
import {SearchButton} from './SearchButton';

import {NightModeContext} from 'src/wrappers/NightModeContext';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'SearchButton component',
  component: SearchButton,
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

// Day mode
function SearchButtonAtDay() {
  return (
    <NightModeContext.Provider value={false}>
      <SearchButton />
    </NightModeContext.Provider>
  );
}
export function DefaultStyle() {
  return <SearchButtonAtDay />;
}

export function FocusStyle() {
  return <SearchButtonAtDay />;
}
FocusStyle.parameters = {pseudo: {focus: true}};

export function HoverStyle() {
  return <SearchButtonAtDay />;
}
HoverStyle.parameters = {pseudo: {hover: true}};

export function ActiveStyle() {
  return <SearchButtonAtDay />;
}
ActiveStyle.parameters = {pseudo: {active: true}};

// Night mode
function SearchButtonAtNight() {
  return (
    <NightModeContext.Provider value={true}>
      <SearchButton />
    </NightModeContext.Provider>
  );
}

export function NightModeStyle() {
  return <SearchButtonAtNight />;
}
NightModeStyle.parameters = {
  backgrounds: {
    default: 'black',
  },
};

export function NightModeFocusStyle() {
  return <SearchButtonAtNight />;
}
NightModeFocusStyle.parameters = {
  backgrounds: {
    default: 'black',
  },
  pseudo: {focus: true},
};

export function NightModeHoverStyle() {
  return <SearchButtonAtNight />;
}
NightModeHoverStyle.parameters = {
  backgrounds: {
    default: 'black',
  },
  pseudo: {hover: true},
};

export function NightModeActiveStyle() {
  return <SearchButtonAtNight />;
}
NightModeActiveStyle.parameters = {
  backgrounds: {
    default: 'black',
  },
  pseudo: {active: true},
};
