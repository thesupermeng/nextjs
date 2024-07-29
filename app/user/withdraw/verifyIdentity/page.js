'use client';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import useUser from '@/hook/user/useUser';
import { ActionType, getSMSOtp } from '@/services/user';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { useTranslation } from 'next-i18next';

export default function Page() {
  const router = useRouter();
  const { user } = useUser();
  const { t } = useTranslation();

  const onRequestOtp = useCallback(() => {
    getSMSOtp(
      user?.country_code,
      user?.mobile,
      ActionType.setSecondaryPassword
    ).then((d) => {
      console.log('$$smsotp', d);
      if (d.code === 0) {
        router.push('/user/withdraw/verifyOtp?reset=true');
      }
    });
  }, [user]);

  return (
    <>
      <NavHeader label={t('forgotPin')} />
      <div className='flex flex-col mx-8 mt-10 gap-2'>
        <p className='text-[35px] font-bold tracking-tight'>
          {t('verifyYourIdentity')}
        </p>
        <p>
          <span className='text-[15px] leading-tight'>
            {t('toVerifyYourIdentityPleaseRequestAOtp')}
          </span>
          <span className='text-[#DE173D]'>
            {' ' + user?.country_code + user?.mobile + ' '}
          </span>
          <span>{t('forVerification')}</span>
        </p>
      </div>

      <button
        onClick={onRequestOtp}
        className='block mx-auto w-60 mt-5 rounded-md h-11 tayagradient'
      >
        {t('requestOtp')}
      </button>
    </>
  );
}
