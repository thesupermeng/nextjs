import { CrossWhite } from '@/asset/icons';
import FullScreenModal from '@/components/FullScreenModal';
import { WithdrawModalType } from '@/components/profileMenu';
import { Button } from '@/componentsH5/button';
import { setWithdrawModal } from '@/store/common';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';

export default function ForgotPin() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const closeModal = () => {
    dispatch(setWithdrawModal(WithdrawModalType.CloseAll));
  };
  const requestOtpClick = () => {
    dispatch(setWithdrawModal(WithdrawModalType.OTPModal));
  };
  return (
    <FullScreenModal>
      <div className='w-[500px] flex-initial flex flex-col rounded-3xl bg-[#121212] p-7 text-center relative'>
        <Image
          alt='close'
          src={CrossWhite}
          className='absolute w-9 h-9 opacity-20 hover:opacity-100 self-end cursor-pointer'
          onClick={closeModal}
        />
        <div className='flex justify-center'>
          <p className='tracking-tight text-xl font-bold'>{t('forgotPin')}</p>
        </div>

        <p className='text-base mb-8'>{t('resetYourPin')}</p>
        <div className='text-left'>
          <p className='mb-5 px-5 text-[15px] leading-tight'>
            {t('toVerifyYourIdentityPleaseRequestAOtp')}
          </p>
        </div>

        <Button className='bg-transparent' onClick={requestOtpClick}>
          {t('requestOtp')}
        </Button>
      </div>
    </FullScreenModal>
  );
}
