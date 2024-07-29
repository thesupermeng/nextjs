import { DoneLottie } from '@/asset/lottie';
import { LottieAnimation } from '@/components/lottie';
import { RightSidebarContantTypes } from '@/components/rightSideMenu';
import { Button } from '@/componentsH5/button';
import { showRightBarContent } from '@/store/common';
import { isWeb } from '@/util/common';
import { RouterH5 } from '@/util/routes';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'next-i18next';

export const WithdrawConfirm = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const goToTransaction = () => {
    if (isWeb()) {
      dispatch(showRightBarContent(RightSidebarContantTypes.Transactions));
    } else {
      router.push(RouterH5.transaction);
    }
  };
  return (
    <div className='flex items-center justify-center text-center flex-1 flex-col'>
      <div className='flex flex-col items-center justify-center mb-5'>
        <LottieAnimation
          src={DoneLottie}
          tw={'w-[3.875rem] h-[3.875rem]'}
          isLoop={false}
        />
        <p className='text-[#FFFFFF]  font-semibold text-[22px]'>
          {t('withdrawSent')}
        </p>
        <p className='text-[#FFFFFF]  font-semibold text-[16px]'>
          {t('yourWithdrawHasBeenSentAndIsAwaitingConfirmation')}
        </p>
      </div>
      <Button className={'w-full bg-transparent'} onClick={goToTransaction}>
        {t('done')}
      </Button>
    </div>
  );
};
