import { getDurationSince } from '@/util/date';
import { useEffect, useRef, useState } from 'react';

export const useDurationSinceText = (since, tick = 1000) => {
  const [text, setText] = useState('');
  const timerRef = useRef(null);
  useEffect(() => {
    timerRef.current = setInterval(() => {
      const newText = getDurationSince(since);
      setText(newText);
    }, tick);
    return () => {
      clearInterval(timerRef.current);
    };
  }, [since, tick]);
  return text;
};
