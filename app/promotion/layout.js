'use client';

import { H5Only, WEBOnly } from '@/components/Fragments/EnvComponent';
import LabelHeader from '@/componentsH5/headerH5/LabelHeader';
import { useTranslation } from 'next-i18next';
import React from 'react';

export default function Layout({ children }) {
  const { t } = useTranslation();

  return (
    <>
      <WEBOnly>{children}</WEBOnly>

      <H5Only>
        <div className='flex flex-1 min-x-0 flex-col bg-transparent z-10'>
          <LabelHeader label={t('promotion')} />
          {children}
        </div>
      </H5Only>
    </>
  );
}
