import { useEffect } from 'react';

export const useKeyboardEvent = (fn) => {
  useEffect(() => {
    document?.addEventListener('keydown', fn, false);
    return () => {
      document?.removeEventListener('keydown', fn, false);
    };
  }, [fn]);
};
