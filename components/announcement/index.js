'use client';
import { IconArrowWhite } from '@/asset/icons';
import { useAnnouncements } from '@/hook/user/useAnnouncements';
import { isWeb } from '@/util/common';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { H5Only, WEBOnly } from '../Fragments/EnvComponent';
import { SpeakerLottie } from '@/asset/lottie';
import { LottieAnimation } from '../lottie';
const Announcement = () => {
  const pathname = usePathname();
  const [isShow, setIsShow] = useState(true);
  const [showAnn, setShowAnn] = useState(true);
  const { textsAnnouncements } = useAnnouncements();

  useEffect(() => {
    if (
      // web case
      pathname.includes('/liveplay/')
    ) {
      setShowAnn(false);
    } else {
      setShowAnn(true);
    }
  }, [pathname]);
  if (textsAnnouncements.length === 0) {
    return null;
  }
  return (
    <>
      {showAnn && (
        <WEBOnly>
          <div
            onClick={() => {
              setIsShow(!isShow);
            }}
            className={`absolute z-40 right-0 flex h-8 flex-row justify-between items-center px-1 bg-black cursor-pointer ${
              isShow ? 'left-0' : ''
            }`}
          >
            {isShow ? (
              <>
                <LottieAnimation
                  src={SpeakerLottie}
                  tw={'w-9 h-9 object-contain'}
                  isLoop={true}
                />
                <AnnContent text={textsAnnouncements} />
              </>
            ) : (
              <></>
            )}
            <Image
              alt='arrow'
              src={IconArrowWhite}
              className={`flex flex-initial transition w-3 h-3 ${
                isShow ? 'rotate-180' : 'rotate-90'
              }`}
            />
          </div>
        </WEBOnly>
      )}
      {showAnn && (
        <H5Only>
          <div
            onClick={() => {
              setIsShow(!isShow);
            }}
            className={`absolute right-0 bottom-16 flex h-7 flex-row justify-between items-center px-1.5 py-1 z-20 cursor-pointer ${
              isShow ? 'left-0 bg-black' : 'bg-transparent'
            }`}
          >
            {isShow ? (
              <>
                <LottieAnimation
                  src={SpeakerLottie}
                  tw={'w-8 h-8 object-contain'}
                  isLoop={true}
                />
                <AnnContent text={textsAnnouncements} />
              </>
            ) : (
              <></>
            )}
            <Image
              alt='arrow'
              src={IconArrowWhite}
              className={`flex flex-initial transition w-3 h-3 ${
                isShow ? '' : 'rotate-180'
              }`}
            />
          </div>
        </H5Only>
      )}
    </>
  );
};

const AnnContent = ({ text }) => {
  const showText = text
    ?.map((str, idx) => {
      return `${idx + 1}. ${str}`;
    })
    .join(' ');
  return (
    <>
      <style>
        {`   
          .announcement-text {
            animation: moveAnnouncement ${Math.max(
              showText.length / 10,
              2
            )}s linear infinite;
          }
          @keyframes moveAnnouncement {
            0% {
              transform: translateX(50vw);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
      <div className='flex-1 mx-2 ml-1 relative self-stretch overflow-hidden'>
        <div className='text-white text-sm absolute flex items-center left-0 top-0 bottom-0 whitespace-nowrap announcement-text'>
          {showText}
        </div>
      </div>
    </>
  );
};
export default Announcement;
