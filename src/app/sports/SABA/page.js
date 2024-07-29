'use client';

import { useSABA } from '@/hook/SABA/useSABA';
import { isWeb } from '@/util/common';
import { useEffect, useRef, useState } from 'react';

export default function Page() {
  const [size, setSize] = useState({ w: 0, h: 0 });
  const ref = useRef(null);
  const { sabaUrl } = useSABA();
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setSize({
        w: entries[0].contentRect.width,
        h: entries[0].contentRect.height,
      });
    });
    observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);

  return (
    <div
      className={`text-white flex flex-1 relative bg-[#18181B] rounded-xl ${
        isWeb() ? 'p-5' : ''
      }`}
    >
      <div
        ref={ref}
        className='relative flex flex-1 overflow-x-auto overflow-y-auto'
      >
        <iframe
          style={{
            width: `${isWeb() ? Math.max(1010, size.w - 40) : size.w}px`,
            height: `${isWeb() ? Math.max(600, size.h - 40) : size.h}px`,
          }}
          className='absolute top-0 bottom-0 left-0 right-0'
          name='iframe'
          allowFullScreen={false}
          webkitallowfullscreen='false'
          mozallowfullscreen='false'
          allowtransparency='false'
          auto='autoplay'
          // muted={false}
          src={sabaUrl}
        />
      </div>
    </div>
  );
}
