---
to: src/components/<%= name %>.stories.js
---
import React from 'react';
import {<%= name %>} from './<%= name %>';

import {NightModeContext} from 'src/wrappers/NightModeContext';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: '<%= name %> component',
  component: <%= name %>,
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
function <%= name %>AtDay() {
  return (
    <NightModeContext.Provider value={false}>
      <<%= name %> />
    </NightModeContext.Provider>
  );
}
export function DefaultStyle() {
  return <<%= name %>AtDay />;
}

export function FocusStyle() {
  return <<%= name %>AtDay />;
}
FocusStyle.parameters = {pseudo: {focus: true}};

export function HoverStyle() {
  return <<%= name %>AtDay />;
}
HoverStyle.parameters = {pseudo: {hover: true}};

export function ActiveStyle() {
  return <<%= name %>AtDay />;
}
ActiveStyle.parameters = {pseudo: {active: true}};

// Night mode
function <%= name %>AtNight() {
  return (
    <NightModeContext.Provider value={true}>
      <<%= name %> />
    </NightModeContext.Provider>
  );
}

export function NightModeStyle() {
  return <<%= name %>AtNight />;
}
NightModeStyle.parameters = {
  backgrounds: {
    default: 'black',
  },
};

export function NightModeFocusStyle() {
  return <<%= name %>AtNight />;
}
NightModeFocusStyle.parameters = {
  backgrounds: {
    default: 'black',
  },
  pseudo: {focus: true},
};

export function NightModeHoverStyle() {
  return <<%= name %>AtNight />;
}
NightModeHoverStyle.parameters = {
  backgrounds: {
    default: 'black',
  },
  pseudo: {hover: true},
};

export function NightModeActiveStyle() {
  return <<%= name %>AtNight />;
}
NightModeActiveStyle.parameters = {
  backgrounds: {
    default: 'black',
  },
  pseudo: {active: true},
};
