import React from 'react';
import ModalPopup from './ModalPopup';

import {NightModeContext} from 'src/context/NightModeContext';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'ModalPopup component',
  component: ModalPopup,
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
function ModalPopupAtDay() {
  return (
    <NightModeContext.Provider value={false}>
      <ModalPopup children={mockContent} />
    </NightModeContext.Provider>
  );
}

export function DefaultStyle() {
  return <ModalPopupAtDay />;
}

// night mode
function ModalPopupAtNight() {
  return (
    <NightModeContext.Provider value={true}>
      <ModalPopup children={mockContent} />
    </NightModeContext.Provider>
  );
}

export function NightModeStyle() {
  return <ModalPopupAtNight />;
}
NightModeStyle.parameters = {
  backgrounds: {
    default: 'white',
  },
};
