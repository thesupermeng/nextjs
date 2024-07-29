import { NodataV2Icon } from '@/asset/icons';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'next-i18next';

export const NodataV2 = () => {
  const { t } = useTranslation();
  return (
    <div className='flex flex-col items-center justify-center flex-1 min-h-[30vh]'>
      <Image src={NodataV2Icon} alt='nodata' width={46} height={50} />
      <p className='text-[#808686] text-sm'>{t('noDataAtTheMoment')}</p>
    </div>
  );
};
