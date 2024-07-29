import { useEffect, useRef, useState } from 'react';

const ScrollThreshhold = 10;
export const useScrollDetect = (query, reset) => {
  const [scrollPos, setScrollPos] = useState(0);
  const scrollPosRef = useRef(null);
  const [retry, setRetry] = useState(0);
  const heightRef = useRef(0);
  useEffect(() => {
    if (!query) {
      return;
    }
    heightRef.current = 0;
    const resizeObserver = new ResizeObserver((entries) => {
      try {
        if (
          heightRef.current &&
          Math.abs(heightRef.current - entries[0].contentRect.height) > 10
        ) {
          heightRef.current = entries[0].contentRect.height;
          setTimeout(() => {
            setRetry((a) => a + 1);
          }, 100);
        } else {
          heightRef.current = entries[0].contentRect.height;
        }
      } catch (e) {}
    });
    const ele = document.querySelectorAll(query);
    if (ele.length === 0) {
      setTimeout(() => {
        setRetry((a) => a + 1);
      }, 100);
    } else {
      scrollPosRef.current = 0;
      [...ele].forEach((el) => {
        resizeObserver.observe(el);
        el.addEventListener('scroll', function (e) {
          if (
            Math.abs(el.scrollTop - scrollPosRef.current) < ScrollThreshhold
          ) {
            return;
          } else {
            scrollPosRef.current = el.scrollTop;
            setScrollPos({
              scrollTop: Math.floor(el.scrollTop),
              clientHeight: Math.floor(el.clientHeight),
              scrollHeight: Math.floor(el.scrollHeight),
            });
          }
        });
      });
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [retry, query, reset]);

  return scrollPos;
};
