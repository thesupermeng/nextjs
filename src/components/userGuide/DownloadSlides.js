import Image from 'next/image';
import { CrossWhite } from '@/asset/icons';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDownloadApp } from '@/hook/common/useDownloadApp';
import { isWeb } from '@/util/common';
import { useDownloadSlides } from './useDownloadSlides';

const timeoutMs = 60 * 1000 * 10; //10 mins
// const SlidesData = [
//   {
//     row1Prefix: (amount) => `FREE ${amount} USDT`,
//     row1: ' on app login',
//     row2: 'Only for App Users!',
//   },
//   {
//     row1: 'Bet, Watch, Win - All in One Place.',
//     row2: 'Seamless Experience Awaits!',
//   },
//   {
//     row1: 'Deposit with USDT for Seamless Betting',
//     row2: 'Effortless and Secure!',
//   },
//   {
//     row1: 'Exclusive Promotions and Activities',
//     row2: 'Don’t miss Out!',
//   },
// ];

export const DownloadSlides = ({ setShowQrModal }) => {
  const slidesContent = useDownloadSlides();

  const [showDownloadSlides, setShowDownloadSlides] = useState(false);
  const refreshRef = useRef(null);
  const isApp = useSelector((s) => s.common.isApp);
  const { onClickDownloadApp } = useDownloadApp();

  const onClickClose = () => {
    setShowDownloadSlides(false);
  };
  const [slideIdx, setSlideIdx] = useState(0);
  useEffect(() => {
    clearInterval(refreshRef.current);
    if (slidesContent.length > 1) {
      refreshRef.current = setInterval(() => {
        setSlideIdx((i) => (i + 1) % slidesContent.length);
      }, 2000);
    }
    return () => {
      clearInterval(refreshRef.current);
    };
  }, [slidesContent.length]);

  useEffect(() => {
    setTimeout(() => {
      if (!isApp) {
        setShowDownloadSlides(true);
      }
    }, 1000);
  }, [isApp]);

  useEffect(() => {
    if (!showDownloadSlides) {
      setTimeout(() => {
        setShowDownloadSlides(true);
        setSlideIdx(0);
      }, timeoutMs);
    }
  }, [showDownloadSlides]);

  if (!showDownloadSlides || isApp) return null;
  return (
    <div className='fixed flex flex-col gap-3 z-50 inset-0 items-center justify-center backdrop-blur-sm bg-black bg-opacity-60'>
      <div
        className={` relative rounded-[0.88rem] overflow-hidden ${
          isWeb() ? 'max-w-[511px]' : 'max-w-[341px]'
        } w-full px-6`}
      >
        <div
          className={`bg-transparent w-full ${
            isWeb() ? 'h-[249px]' : 'h-[166px]'
          }`}
        >
          {slidesContent?.[slideIdx]?.image && (
            <Image
              src={slidesContent?.[slideIdx]?.image}
              alt='slides-content'
              width={isWeb() ? 511 : 341}
              height={isWeb() ? 249 : 166}
              key={slidesContent?.[slideIdx]?.image}
              className='object-cover w-full h-full rounded-t-lg'
            />
          )}
        </div>
        <div className='bg-[#191A1D] w-full h-[148px] rounded-xl rounded-t-none flex flex-col items-center py-2'>
          <div className=''>
            {/* {slidesContent[slideIdx].row1Prefix ? (
              <span className='text-tayaRed text-sm font-bold'>
                {SlidesData[slideIdx].row1Prefix(1)}
              </span>
            ) : null} */}
            <span className='text-[#CCC] text-sm font-normal'>
              {slidesContent[slideIdx]?.data?.desc}
            </span>
          </div>
          <div className='text-white text-[19px] font-bold'>
            {slidesContent[slideIdx]?.data?.title}
          </div>

          <button
            onClick={(e) => {
              if (isWeb()) {
                setShowDownloadSlides(false);
                setShowQrModal(true);
              } else {
                onClickDownloadApp(e);
              }
            }}
            className='mt-3 self-stretch mx-4 py-3 bg-tayaRed rounded text-white text-17 font-bold'
          >
            Download Now
          </button>
        </div>
      </div>
      <Image
        src={CrossWhite}
        alt='CrossWhite'
        className='w-[1.6rem] h-[1.6rem] opacity-50 hover:opacity-100'
        onClick={onClickClose}
      />
    </div>
  );
};
