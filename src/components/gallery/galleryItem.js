import { VideoIcon } from '@/asset/icons';
import Image from 'next/image';
import React from 'react';

const GalleryItem = ({ data, handleGalleryClick }) => {
  const videoItem = (
    <div className='flex flex-1 object-contain bg-[#09090960] relative'>
      <video src={data?.src} width={'100%'} height={'100%'}></video>
      <Image
        src={VideoIcon}
        alt='videoIcon'
        width={25}
        height={25}
        className='absolute top-3 right-3'
      />
    </div>
  );

  const imageItem = (
    <Image
      src={data?.src}
      width={200}
      height={200}
      className='flex flex-1 object-contain bg-[#09090960]'
    ></Image>
  );

  const renderedItem = () => {
    switch (data?.type) {
      case 0:
        return imageItem;
      case 2:
        return videoItem;
      default:
        return imageItem;
    }
  };

  return (
    <div
      className='flex flex-1 w-[200px] h-[200px] my-1'
      onClick={handleGalleryClick}
    >
      {renderedItem()}
    </div>
  );
};

export default GalleryItem;
