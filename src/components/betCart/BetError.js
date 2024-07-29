import React from 'react';
import { useTranslation } from 'next-i18next';

export default function BetError({
  title = '',
  message = '',
  setShowErrorModal = null,
}) {
  const { t } = useTranslation();
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center flex-1'>
      <div className='gap-3 flex flex-col py-8 px-16 items-center justify-center flex-initial backdrop-blur-lg rounded bg-[#191A1D80] text-white text-lg font-semibold'>
        <div className=' opacity-90'>{title}</div>
        <div className=' opacity-90 text-center'>{message}</div>
        <button
          className='px-5 py-1 tayagradient rounded-lg'
          onClick={(e) => {
            e.stopPropagation();
            setShowErrorModal((val) => !val);
          }}
        >
          {t('ok')}
        </button>
      </div>
    </div>
  );
}
