import React from 'react';
import { LottieAnimation } from '../lottie';
import { IrrLoading } from '@/asset/lottie';
import { FullPageContent } from '@/componentsH5/FullPageContent';

export const LoadingPage = ({ full = false }) => {
  return full ? (
    <FullPageContent>
      <div className='flex flex-1 w-full h-full items-center justify-center'>
        <LottieAnimation
          src={IrrLoading}
          tw={`w-[${80}px] h-[${80}px]`}
          isLoop={true}
        />
      </div>
    </FullPageContent>
  ) : (
    <div className='flex flex-1 w-full h-full items-center justify-center'>
      <LottieAnimation
        src={IrrLoading}
        tw={`w-[${80}px] h-[${80}px]`}
        isLoop={true}
      />
    </div>
  );
};
