import { loadingGIF } from '@/asset/gif';
import Image from 'next/image';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

const GifSize = 9.375 * 16;
const LoadingSpinner = () => {
  const isLoading = useSelector((s) => s.videoPlayer.isLoading, shallowEqual);
  return isLoading ? (
    <div className='absolute top-0 flex items-center justify-center w-full h-full pointer-events-none '>
      <Image src={loadingGIF} width={GifSize} height={GifSize} alt='loading' />
      {/* <div className='w-12 h-12 border-t-2 border-b-2 rounded-full border-white-900 animate-spin'></div> */}
    </div>
  ) : (
    <></>
  );
};

export default LoadingSpinner;
