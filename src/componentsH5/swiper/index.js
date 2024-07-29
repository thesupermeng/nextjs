'use client';
import React, { useRef, useState } from 'react';

export default function Swiper({ vertical = false, tw, children }) {
  const swiperContainerRef = useRef(null);
  const [startX, setStartX] = useState(null);
  const [currentX, setCurrentX] = useState(null);
  const [startY, setStartY] = useState(null);
  const [currentY, setCurrentY] = useState(null);

  const handleTouchStart = (e) => {
    console.log('e', e);
    if (vertical) {
      setStartY(e.touches[0].clientY);
    } else {
      setStartX(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e) => {
    if (vertical) {
      if (startY === null) return; // Ignore if startX is not set
      setCurrentY(e.touches[0].clientY);
    } else {
      if (startX === null) return; // Ignore if startX is not set
      setCurrentX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    if (vertical) {
      if (startY === null || currentY === null) return;

      const deltaY = currentY - startY;
      const container = swiperContainerRef.current;

      // Scroll freely by deltaX
      const newPosition = Math.min(
        Math.max(container.scrollTop - deltaY, 0),
        container.scrollHeight - container.clientHeight
      );

      // Animate scrolling to the new position
      container.scrollTo({
        top: newPosition,
        behavior: 'smooth',
      });

      setStartY(null);
      setCurrentY(null);
    } else {
      if (startX === null || currentX === null) return;

      const deltaX = currentX - startX;
      const container = swiperContainerRef.current;

      // Scroll freely by deltaX
      const newPosition = Math.min(
        Math.max(container.scrollLeft - deltaX, 0),
        container.scrollWidth - container.clientWidth
      );

      // Animate scrolling to the new position
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth',
      });

      setStartX(null);
      setCurrentX(null);
    }
  };

  return (
    <div
      className={`min-w-[1%] ${
        vertical ? 'overflow-y-auto' : 'overflow-x-auto'
      } ${tw}`}
      ref={swiperContainerRef}
      // onTouchStart={handleTouchStart}
      // onTouchMove={handleTouchMove}
      // onTouchEnd={handleTouchEnd}
      // onTouchCancel={handleTouchEnd}
      style={
        vertical
          ? {
              overflowY: 'auto',
              whiteSpace: 'nowrap',
            }
          : {
              overflowX: 'auto',
              whiteSpace: 'nowrap',
            }
      }
    >
      {children}
    </div>
  );
}
