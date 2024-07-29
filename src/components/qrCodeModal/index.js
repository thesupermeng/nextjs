import React from 'react';
import { useTranslation } from 'next-i18next';
import QrcodeGenerator from '../qrCodeGenerator';
import Image from 'next/image';
import { AndroidIcon, AppleStoreIcon, CrossWhite } from '@/asset/icons';

export const QrCodeModal = ({ setShowQrModal = () => {} }) => {
  const { t } = useTranslation();
  return (
    <div className='fixed flex flex-col gap-3 z-50 inset-0 items-center justify-center backdrop-blur-sm bg-black bg-opacity-60'>
      <div className='shadow-sm flex items-center justify-between flex-col p-5 relative rounded-[28px] bg-[#121212] min-w-[475px] min-h-[349px]'>
        <Image
          onClick={() => setShowQrModal(false)}
          src={CrossWhite}
          alt='cross'
          width={40}
          height={40}
          className='absolute right-3 top-3 opacity-20 hover:opacity-100 cursor-pointer'
        />
        <p className='text-center text-[20px] font-bold'>{t('eastRichApp')}</p>
        <QrcodeGenerator />
        <span className='text-center mx-5'>
          <span>{t('scanToDownload')} </span>
          <span className='text-tayaRed'>{t('eastRichApp')}</span>
          <span>!</span>
        </span>

        <div className='flex items-center justify-center divide-x-2 divide-[#BDBDBD]'>
          <Image
            src={AppleStoreIcon}
            alt='AppleStoreIcon'
            width={48}
            height={48}
            className='px-2'
          />
          <Image
            src={AndroidIcon}
            alt='AppleStoreIcon'
            width={48}
            height={48}
            className='px-2'
          />
        </div>
      </div>
    </div>
  );
};
