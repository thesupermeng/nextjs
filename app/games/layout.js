'use client';
import React from 'react';
import LabelHeader from '@/componentsH5/headerH5/LabelHeader';
import { H5Only, WEBOnly } from '@/components/Fragments/EnvComponent';
import { useTranslation } from 'next-i18next';

export default function Layout({ children }) {
  const { t } = useTranslation();

  return (
    <>
      <WEBOnly>{children}</WEBOnly>
      <H5Only>
        <div className='flex flex-1 min-x-0 flex-col bg-transparent z-10'>
          <LabelHeader label={t('games')} />
          {children}
        </div>
      </H5Only>
    </>
  );
}
