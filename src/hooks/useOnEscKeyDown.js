import {useEffect} from 'react';
export const useOnEscKeyDown = (state, handler) => {
  useEffect(() => {
    const closeByEsc = event => {
      if (event.key === 'Escape') {
        handler();
      }
    };
    if (state) {
      document.addEventListener('keydown', closeByEsc);
    } else {
      document.removeEventListener('keydown', closeByEsc);
    }
    return () => {
      document.removeEventListener('keydown', closeByEsc);
    }; // otherwise Jest/Testing-Library issues a warning
  }, [state]);
};
