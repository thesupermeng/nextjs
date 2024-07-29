import Image from 'next/image';
import { CrossWhite } from '@/asset/icons';
import { useEffect, useRef, useState } from 'react';
import { useAnnouncements } from '@/hook/user/useAnnouncements';
import LoadingSpinner from '../videoPlayer/loading';
import { isWeb } from '@/util/common';
import { useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import { LocalStorageKeys } from '@/config/common';
import { getAwayDuration, updateLastAccessTime } from './LastAccessTIme';

//delay before the pop up
const timeoutMs = 3000;
const AwayTimeToResetSeenList = 24 * 3600 * 1000;

export const PromotionModal = () => {
  const { imagesAnnouncements: promoModel } = useAnnouncements();
  const isApp = useSelector((s) => s.common.isApp);
  const [modalContent, setModalContent] = useState(undefined);
  const pathname = usePathname();
  useEffect(() => {
    const awayTime = getAwayDuration();
    if (awayTime > AwayTimeToResetSeenList) {
      localStorage.removeItem(LocalStorageKeys.SeenPromoModalContents);
    }
    updateLastAccessTime();
  }, [pathname]);
  const getStoredSeenContents = () => {
    return (
      JSON.parse(
        localStorage.getItem(LocalStorageKeys.SeenPromoModalContents)
      ) || []
    );
  };

  const setPromoModalImageData = () => {
    const unseenContents = promoModel.filter(
      (image) => !getStoredSeenContents().includes(image.image)
    );
    setModalContent(unseenContents[0]);
  };

  const onClickClose = () => {
    localStorage.setItem(
      LocalStorageKeys.SeenPromoModalContents,
      JSON.stringify([...getStoredSeenContents(), modalContent.image])
    );
    setModalContent(null);
  };

  useEffect(() => {
    if (pathname === '/home' && promoModel) {
      setTimeout(() => {
        setPromoModalImageData();
      }, timeoutMs);
    }
  }, [promoModel, pathname]);

  return (
    <>
      {!isApp &&
        pathname !== '/coinpal/result' &&
        modalContent &&
        promoModel && (
          <>
            <div
              onClick={onClickClose}
              className='fixed flex flex-col gap-3 z-50 inset-0 items-center justify-center backdrop-blur-sm bg-black bg-opacity-60'
            >
              <div
                onClick={(e) => {
                  e.preventDefault();
                  window.open(modalContent.url);
                  onClickClose();
                }}
                className={` relative rounded-[0.88rem] overflow-hidden ${
                  isWeb() ? 'w-[31.25rem] h-[31.25rem]' : 'w-[21rem] h-[21rem]'
                }`}
              >
                {modalContent.image ? (
                  <Image src={modalContent.image} alt='promotion image' fill />
                ) : (
                  <LoadingSpinner />
                )}
              </div>
              <Image
                src={CrossWhite}
                alt='CrossWhite'
                className='w-[1.6rem] h-[1.6rem] opacity-50 hover:opacity-100'
                onClick={onClickClose}
              />
            </div>
          </>
        )}
    </>
  );
};
