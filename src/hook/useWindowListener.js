import { useEffect } from 'react';

const windowListeners = {};
export const useWindowListener = (key, fn) => {
  useEffect(() => {
    window?.removeEventListener(key, windowListeners[key]);
    window?.addEventListener(key, fn);
    windowListeners[key] = fn;
    return () => {
      window?.removeEventListener(key, windowListeners[key]);
    };
  }, [key, fn]);
};
