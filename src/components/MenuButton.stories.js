import React from 'react';
import {MenuButton} from './MenuButton';

import {NightModeContext} from 'src/wrappers/NightModeContext';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'MenuButton component',
  component: MenuButton,
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
function MenuButtonAtDay() {
  return (
    <NightModeContext.Provider value={false}>
      <MenuButton />
    </NightModeContext.Provider>
  );
}

export function DefaultStyle() {
  return <MenuButtonAtDay />;
}

export function FocusStyle() {
  return <MenuButtonAtDay />;
}
FocusStyle.parameters = {pseudo: {focus: true}};

export function HoverStyle() {
  return <MenuButtonAtDay />;
}
HoverStyle.parameters = {pseudo: {hover: true}};

export function ActiveStyle() {
  return <MenuButtonAtDay />;
}
ActiveStyle.parameters = {pseudo: {active: true}};

// Night mode
function MenuButtonAtNight() {
  return (
    <NightModeContext.Provider value={true}>
      <MenuButton />
    </NightModeContext.Provider>
  );
}

export function NightModeStyle() {
  return <MenuButtonAtNight />;
}
NightModeStyle.parameters = {
  backgrounds: {
    default: 'black',
  },
};

export function NightModeFocusStyle() {
  return <MenuButtonAtNight />;
}
NightModeFocusStyle.parameters = {
  backgrounds: {
    default: 'black',
  },
  pseudo: {focus: true},
};

export function NightModeHoverStyle() {
  return <MenuButtonAtNight />;
}
NightModeHoverStyle.parameters = {
  backgrounds: {
    default: 'black',
  },
  pseudo: {hover: true},
};

export function NightModeActiveStyle() {
  return <MenuButtonAtNight />;
}
NightModeActiveStyle.parameters = {
  backgrounds: {
    default: 'black',
  },
  pseudo: {active: true},
};
