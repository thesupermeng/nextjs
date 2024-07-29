import { CrossWhite, FreeUSDTPromoIcon } from '@/asset/icons';
import { useDownloadApp } from '@/hook/common/useDownloadApp';
import useGetConfig from '@/hook/user/useGetConfig';
import { useCurrentPromotion } from '@/hook/user/usePromotions';
import Image from 'next/image';
import { useMemo, useState } from 'react';

export const DownloadIcon = () => {
  const [showPromoIcon, setShowPromoIcon] = useState(true);
  const { onClickDownloadApp } = useDownloadApp();
  const { config } = useGetConfig();
  const promoDetail = useCurrentPromotion(
    showPromoIcon ? config?.['first_app_login']?.['reward_promotion_id'] : ''
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
  const onClickClose = () => {
    setShowPromoIcon(false);
  };
  return (
    <>
      {showPromoIcon && (
        <div className='fixed right-2 bottom-[10.5rem] w-fit h-fit z-10'>
          <div className='w-full flex flex-row-reverse mb-1'>
            <Image
              src={CrossWhite}
              alt='CrossWhite'
              className='w-3 h-3 opacity-50 hover:opacity-100'
              onClick={onClickClose}
            />
          </div>
          <div className='w-fit h-fit' onClick={onClickDownloadApp}>
            <Image
              src={FreeUSDTPromoIcon}
              alt='FreeUSDTPromoIcon'
              className='w-[3.4rem] h-[1.9rem] -rotate-[5deg]'
            />
            <p className='bg-[#DE173E] h-fit px-1 rounded-xl text-white text-[0.625rem] font-[590] -translate-y-1'>
              Get<span className='text-[1rem] font-[700]'> ${rewardAmt}*</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};
