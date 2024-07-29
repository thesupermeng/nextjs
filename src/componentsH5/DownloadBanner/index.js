import { EastRichWhiteLogo } from '@/asset/icons';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { DownloadIcon } from './DownloadIcon';
import { useDownloadApp } from '@/hook/common/useDownloadApp';
import { useSelector } from 'react-redux';
import useGetConfig from '@/hook/user/useGetConfig';
import { useCurrentPromotion } from '@/hook/user/usePromotions';
import { formatCreditWholeNum } from '@/util/numbers';

export const DownloadBanner = () => {
  const pathname = usePathname();
  const [showBanner, setShowBanner] = useState(false);
  const { onClickDownloadApp } = useDownloadApp();
  const isApp = useSelector((s) => s.common.isApp);
  const { config, isActive } = useGetConfig();
  const promoDetail = useCurrentPromotion(
    showBanner ? config?.['first_app_login']?.['reward_promotion_id'] : ''
  );
  const rewardAmt = useMemo(() => {
    try {
      return promoDetail.currentPromotion.promotion_progress.tiers[0].reward;
    } catch {
      (e) => {
        return '';
      };
    }
  }, [promoDetail]);

  useEffect(() => {
    if (
      isActive &&
      (pathname === '/home' ||
        pathname === '/promotion' ||
        pathname === '/user/home' ||
        pathname === '/sports/Eastrich' ||
        pathname === '/sports/FB' ||
        pathname === '/games' ||
        pathname.includes('/live/')) &&
      !isApp
    ) {
      setShowBanner(true);
    } else {
      setShowBanner(false);
    }
  }, [config, pathname, isActive]);

  return (
    <>
      {showBanner && (
        <>
          <div
            className={`common-transition top-0 fixed flex flex-none -order-1 w-full flex-row items-center gap-1.5 bg-black px-2.5 py-1.5 z-20`}
          >
            <div className='relative shrink-0 w-9 h-9 rounded-lg bg-[#DC1D3F] overflow-hidden flex items-center justify-center'>
              <Image
                src={EastRichWhiteLogo}
                alt='TayaLogo'
                width={30}
                height={30}
              />
            </div>
            <div className='flex flex-col flex-1 truncate'>
              <p className='text-[1rem] font-semibold truncate text-ellipsis'>
                <span className='animate-[H5BannerHeader_1.5s_linear_infinite]'>
                  FREE {formatCreditWholeNum(rewardAmt, true)}
                </span>{' '}
                on your 1st bet!
              </p>
              <p className='text-[0.6875rem] truncate'>
                Exclusive offer for new app users!
              </p>
            </div>
            <div className='w-[5rem] h-[2.2rem] flex flex-row justify-center items-center'>
              <button
                onClick={onClickDownloadApp}
                key={'download'}
                className={`flex justify-center items-center rounded-full bg-white text-tayaRed py-2 font-[500] animate-[H5BannerButton_1.5s_ease-in-out_infinite]
            `}
              >
                Open
              </button>
            </div>
          </div>
          <DownloadIcon />
        </>
      )}
    </>
  );
};
