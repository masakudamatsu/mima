import {useEffect, useState} from 'react';

export function useSessionStorageState(key, defaultValue = '') {
  // Lazy-initializer
  const [state, setState] = useState(() => {
    const valueInSessionStorage = window.sessionStorage.getItem(key);
    if (valueInSessionStorage) {
      return JSON.parse(valueInSessionStorage); // Convert string back into non-string value
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue; // Handle the case in which the defaultValue is computationally so expensive that it is provided as a function (i.e. the lazy-initializer)
  });

  useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(state)); // Convert non-string value into string
  }, [key, state]);

  return [state, setState];
}

// This code snippet is adapted from https://github.com/kentcdodds/react-hooks/blob/main/src/final/02.extra-4.js

// To use alternative functions to JSON.stringify() and JSON.parse()
// or to remove the previous key from localStroage when key changes,
// watch https://epicreact.dev/modules/react-hooks/useeffect-persistent-state-extra-credit-solution-4
