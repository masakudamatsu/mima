import {useEffect} from 'react';
export const useOnClickOutside = (ref, handler, {disable = false} = {}) => {
  useEffect(() => {
    const listener = event => {
      if (disable) {
        return;
      }
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('pointerdown', listener);
    return () => {
      document.removeEventListener('pointerdown', listener);
    };
  }, [ref, handler, disable]);
};
