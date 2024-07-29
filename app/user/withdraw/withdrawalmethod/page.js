'use client';
import WithdrawMethod from '@/components/profileMenu/topUpSlider/components/withdrawMethod';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import React from 'react';
import { useTranslation } from 'next-i18next';

export default function Page() {
  const { t } = useTranslation();

  return (
    <FullPageContent>
      <NavHeader label={t('withdrawalMethod')} />
      <WithdrawMethod />
    </FullPageContent>
  );
}
