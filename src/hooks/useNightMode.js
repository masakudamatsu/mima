import {useContext, useEffect} from 'react';

export const useNightMode = NightModeContext => {
  const nightMode = useContext(NightModeContext);
  useEffect(() => {
    document.body.dataset.darkmode = nightMode;
  }, [nightMode]);
};
