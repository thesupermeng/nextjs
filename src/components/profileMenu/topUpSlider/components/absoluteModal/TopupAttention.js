import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { IconAttention } from '@/asset/icons';

export default function TopUpAttention({ onConfirm }) {
  const { t } = useTranslation();
  return (
    <div className='z-[200] flex items-center justify-center flex-1 bg-black absolute inset-0 py-5 px-[30px] gap-3'>
      <div className='z-[200] w-[350px] bg-black flex-col flex flex-none py-5 px-[30px] gap-3 items-center justify-center'>
        <Image alt='!' src={IconAttention} />
        <div className='text-center text-[17px] font-bold text-white'>
          Attention
        </div>
        <div className='text-center text-base font-normal text-white'>
          Please make sure that the entered amount matches the deposit amount on
          the third-party payment platform (CoinPal). Failure to do so may
          result in an unsuccessful transaction.
        </div>
        <div
          onClick={onConfirm}
          className='mx-5 text-sm font-semibold gap-1 flex flex-col py-2.5 px-16 self-stretch justify-center flex-initial backdrop-blur-lg rounded bg-tayaRed text-white text-center'
        >
          OK
        </div>
      </div>
    </div>
  );
}
