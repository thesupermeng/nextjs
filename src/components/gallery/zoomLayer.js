import React from 'react';
import Image from 'next/image';
import { ArrowWhiteLeft, Glyph } from '@/asset/icons';
import { useState } from 'react';
import PlayerControl from './playerControl';

export default function ZoomLayer({ data, handleGalleryClick, current }) {
  const [currentPage, setCurrentPage] = useState(current.current);
  const isLastPage = currentPage === data.length - 1;
  const isFirstPage = currentPage === 0;

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const goToNextPage = () => {
    if (currentPage < data.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className=' group fixed inset-0 z-40 flex items-center justify-center bg-[#121212]'>
        <div className='absolute top-5 right-5' onClick={handleGalleryClick}>
          <Image src={Glyph} alt='cross' width={40} height={40} />
        </div>
        <div
          className={`absolute left-10  ${isFirstPage ? 'opacity-30' : ''}`}
          onClick={goToPreviousPage}
        >
          <Image src={ArrowWhiteLeft} width={40} height={40} alt='left' />
        </div>

        {data[currentPage].type === 0 ? (
          <div className='flex items-center justify-center h-full duration-300 ease-in-out'>
            <Image
              src={data[currentPage].src}
              className='object-cover'
              width={500}
              height={500}
              alt='pic'
            ></Image>
          </div>
        ) : (
          <div className='flex items-center justify-center duration-300 ease-in-out'>
            <video
              src={data[currentPage].src}
              width={'100%'}
              height={'100%'}
              muted
              playsInline
            ></video>
            <div className='absolute bottom-0 left-0 right-0 invisible px-10 my-3 group-hover:visible'>
              <PlayerControl />
            </div>
          </div>
        )}

        <div
          className={`absolute right-10 transform scale-x-[-1] ${
            isLastPage ? 'opacity-30' : ''
          }`}
          onClick={goToNextPage}
        >
          <Image src={ArrowWhiteLeft} width={40} height={40} alt='right' />
        </div>
      </div>
    </>
  );
}
