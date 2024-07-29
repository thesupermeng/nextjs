import React, { useState } from 'react';
import { LottieAnimation } from '../lottie';
import { IrrLoading } from '@/asset/lottie';

export const AnimationWrapper = ({ url, isMini }) => {
  const [loading, setLoading] = useState(true);
  return (
    <div
      className={`${
        isMini && 'pointer-events-none'
      } relative flex w-full h-full flex-row items-center justify-center rounded-xl group/player`}
    >
      {loading && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <LottieAnimation
            src={IrrLoading}
            tw={`w-[${100}px] h-[${100}px]`}
            isLoop={true}
          />
        </div>
      )}

      <iframe
        src={url?.[0] + '&language=en'}
        className='w-full h-full'
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};
