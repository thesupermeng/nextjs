import { FlyingPlane } from '@/asset/icons';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';

export default function TopUpRedirect() {
  const topUpRedirect = useSelector((s) => s.common.topUpRedirect);
    const { t } = useTranslation();

  if (!topUpRedirect) return null;
  return (
    <div className='z-[200] absolute inset-0 flex flex-col items-center justify-center flex-1'>
      <div className='text-[17px] gap-1 flex flex-col py-8 px-16 items-center justify-center flex-initial backdrop-blur-lg rounded bg-[#191A1D80] text-white font-semibold'>
        <Image src={FlyingPlane} alt='flying' width={80} height={80} />
        <div className='opacity-90'>{t('youreBeingRedirected')}</div>
        <div className='opacity-90'>{t('toCheckout')}</div>
      </div>
    </div>
  );
}
