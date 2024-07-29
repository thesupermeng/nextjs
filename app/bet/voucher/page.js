'use client';
import { VoucherSidebar } from '@/components/voucher/voucherSidebar';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { FullPageContent } from '@/componentsH5/FullPageContent';

export default function Page() {
  const { t } = useTranslation();
  return (
    <FullPageContent>
      <NavHeader label={t('myVoucher')} />
      <VoucherSidebar />
    </FullPageContent>
  );
}
