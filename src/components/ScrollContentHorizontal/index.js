import { IconArrowWhite } from '@/asset/icons';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const PaddingOffset = 60;
export default function ScrollContentHorizontal({ children }) {
  const [height, setHeight] = useState(0);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [offsetX, setOffsetX] = useState({ val: 0, left: false, right: true });

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      updateOffset(null, true);
    });
    observer.observe(containerRef.current);
    return () =>
      containerRef.current && observer.unobserve(containerRef.current);
  }, []);

  useEffect(() => {
    updateOffset(null, true);
    setHeight(contentRef.current?.getBoundingClientRect().height);
  }, [
    containerRef.current?.getBoundingClientRect().width,
    contentRef.current?.getBoundingClientRect().width,
  ]);
  const updateOffset = (e, toLeft) => {
    e?.preventDefault();
    setOffsetX((offset) => {
      const newOffset =
        offset.val +
        (containerRef.current?.getBoundingClientRect().width / 2) *
          (toLeft ? 1 : -1);
      return {
        val: Math.min(
          Math.max(
            containerRef.current?.getBoundingClientRect().width -
              contentRef.current?.getBoundingClientRect().width,
            newOffset
          ),
          0
        ),
        left:
          containerRef.current?.getBoundingClientRect().x >
          contentRef.current?.getBoundingClientRect().x,
        right:
          containerRef.current?.getBoundingClientRect().right <
          contentRef.current?.getBoundingClientRect().right - 1,
      };
    });
  };
  return (
    <>
      <div
        className='relative flex-1 overflow-hidden mr-3'
        style={{ height: `${height}px` }}
        ref={containerRef}
      >
        {' '}
        <div
          ref={contentRef}
          style={{ left: offsetX.val }}
          className='transition-[left] absolute top-0'
        >
          {children}
        </div>
        {offsetX.left && (
          <Move direction='left' onClick={(e) => updateOffset(e, true)} />
        )}
        {offsetX.right && (
          <Move direction='right' onClick={(e) => updateOffset(e, false)} />
        )}
      </div>
    </>
  );
}
const Move = ({ direction, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{ width: `${PaddingOffset}px` }}
      className={`select-none absolute top-0 bottom-0 opacity-1 flex flex-initial items-center justify-center px-3 self-stretch ${
        direction === 'left'
          ? 'bg-gradient-to-r left-0'
          : 'bg-gradient-to-l right-0'
      } from-[#090909FF] from-50% via-[#090909E6] to-[#09090900]`}
    >
      <Image
        alt='arrow'
        src={IconArrowWhite}
        className={`${direction === 'left' ? 'rotate-90' : '-rotate-90'}`}
      />
    </div>
  );
};
