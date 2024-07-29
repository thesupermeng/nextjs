import { useRef, useState } from 'react';

export const useTapDebounce = (delay = 5000) => {
  const [isTap, setIsTap] = useState(false);
  const tapRef = useRef(null);
  const onTap = () => {
    setIsTap(true);
    clearTimeout(tapRef.current);
    tapRef.current = setTimeout(() => {
      setIsTap(false);
    }, delay);
    return () => {
      clearTimeout(tapRef.current);
    };
  };
  return [isTap, onTap];
};
