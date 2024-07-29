'use client';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import { useParams } from 'next/navigation';
import React from 'react';
import { WithdrawSummary } from '@/components/profileMenu/topUpSlider/components/withdrawSummary';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import { useTranslation } from 'next-i18next';

export default function Page() {
  const { t } = useTranslation();

  return (
    <FullPageContent>
      <div className='flex flex-1 flex-col'>
        <NavHeader label={t('withdraw')} />
        <WithdrawSummary />
      </div>
    </FullPageContent>
  );
}
