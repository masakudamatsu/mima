import React from 'react';
import LocatorButton from './LocatorButton';

import {NightModeContext} from 'src/context/NightModeContext';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'LocatorButton component',
  component: LocatorButton,
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

export function DefaultStyle() {
  return <LocatorButton />;
}

export function FocusStyle() {
  return <LocatorButton />;
}
FocusStyle.parameters = {pseudo: {focus: true}};

export function HoverStyle() {
  return <LocatorButton />;
}
HoverStyle.parameters = {pseudo: {hover: true}};

export function ActiveStyle() {
  return <LocatorButton />;
}
ActiveStyle.parameters = {pseudo: {active: true}};

// Night mode
function LocatorButtonAtNight() {
  return (
    <NightModeContext.Provider value={true}>
      <LocatorButton />
    </NightModeContext.Provider>
  );
}

export function NightModeStyle() {
  return <LocatorButtonAtNight />;
}
NightModeStyle.parameters = {
  backgrounds: {
    default: 'black',
  },
};

export function NightModeFocusStyle() {
  return <LocatorButtonAtNight />;
}
NightModeFocusStyle.parameters = {
  backgrounds: {
    default: 'black',
  },
  pseudo: {focus: true},
};

export function NightModeHoverStyle() {
  return <LocatorButtonAtNight />;
}
NightModeHoverStyle.parameters = {
  backgrounds: {
    default: 'black',
  },
  pseudo: {hover: true},
};

export function NightModeActiveStyle() {
  return <LocatorButtonAtNight />;
}
NightModeActiveStyle.parameters = {
  backgrounds: {
    default: 'black',
  },
  pseudo: {active: true},
};
