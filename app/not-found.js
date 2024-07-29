import { Icon404 } from '@/asset/icons';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import i18n from 'i18next';
import Image from 'next/image';
import React from 'react';

export default function NotFound() {
  return (
    <FullPageContent className='flex flex-col flex-1 items-center justify-center text-[#808686]'>
      <p> {i18n.t('pageNotFound')}</p>
      <Image src={Icon404} alt='404' width={300} />
      <p>{i18n.t('wereSorryThePageYouRequestedNotFound')}</p>
      <a
        href='/'
        className='bg-tayaRed p-2 rounded-[5px] my-5 text-white cursor-pointer'
      >
        {i18n.t('goToHome')}
      </a>
    </FullPageContent>
  );
}
