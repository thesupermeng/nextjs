import { useEffect, useRef, useState } from 'react';

export const NewsTicker = ({
  always = false,
  children,
  animateOnce = false,
  onEnd = () => {},
}) => {
  const onEndRef = useRef(null);
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [animationDuration, setAnimationDuration] = useState(0);

  useEffect(() => {
    if (
      ref.current?.clientWidth &&
      ref.current?.parentNode?.clientWidth &&
      (always || ref.current.clientWidth > ref.current.parentNode.clientWidth)
    ) {
      setAnimationDuration(
        (ref.current.clientWidth / ref.current.parentNode.clientWidth) * 8
      );
    } else {
      setAnimationDuration(0);
    }
  }, [always, ref.current?.clientWidth, ref.current?.parentNode?.clientWidth]);

  useEffect(() => {
    clearTimeout(onEndRef.current);
    if (animateOnce && animationDuration > 0) {
      onEndRef.current = setTimeout(() => {
        onEnd?.();
      }, [animationDuration * 1000]);
    }
    return () => {
      clearTimeout(onEndRef.current);
    };
  }, [animateOnce, animationDuration, onEnd]);
  return (
    <div
      ref={containerRef}
      className='w-full h-fit overflow-hidden flex flex-row'
    >
      <div
        ref={ref}
        style={{ animationDuration: `${animationDuration}s` }}
        className={`whitespace-nowrap flex flex-1 w-fit justify-start ${
          animateOnce
            ? 'animate-[moveTextToLeft_10s_linear]'
            : 'animate-[moveTextToLeft_10s_linear_infinite]'
        }`}
      >
        <div
          className='flex flex-1'
          style={{ width: containerRef.current?.clientWidth }}
        />
        {children}
      </div>
    </div>
  );
};
