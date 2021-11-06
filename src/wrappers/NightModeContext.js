import {createContext} from 'react';

export const NightModeContext = createContext();

export function NightModeProvider(props) {
  let nightMode;
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  if (currentHour < 6 || currentHour >= 18) {
    nightMode = true;
  } else {
    nightMode = false;
  }
  return <NightModeContext.Provider value={nightMode} {...props} />;
}
