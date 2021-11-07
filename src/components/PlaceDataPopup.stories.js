import React from 'react';
import {PlaceDataPopup} from './PlaceDataPopup';

import {NightModeContext} from 'src/wrappers/NightModeContext';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'PlaceDataPopup component',
  component: PlaceDataPopup,
  parameters: {
    backgrounds: {
      default: 'black',
      values: [
        {name: 'white', value: '#fff'},
        {name: 'black', value: '#2b2b2b'},
      ],
    },
  },
};

const mockContent = <p>This is a modal popup.</p>;

// light mode
function PlaceDataPopupAtDay() {
  return (
    <NightModeContext.Provider value={false}>
      <PlaceDataPopup children={mockContent} />
    </NightModeContext.Provider>
  );
}

export function DefaultStyle() {
  return <PlaceDataPopupAtDay />;
}

// night mode
function PlaceDataPopupAtNight() {
  return (
    <NightModeContext.Provider value={true}>
      <PlaceDataPopup children={mockContent} />
    </NightModeContext.Provider>
  );
}

export function NightModeStyle() {
  return <PlaceDataPopupAtNight />;
}
NightModeStyle.parameters = {
  backgrounds: {
    default: 'white',
  },
};
