'use client';
import { VoucherSidebar } from '@/components/voucher/voucherSidebar';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { FullPageContent } from '@/componentsH5/FullPageContent';

export default function Page() {
  const { t } = useTranslation();
  return (
    <FullPageContent>
      <NavHeader
        label={t('myVoucher')}
        right={
          <Link
            className='mx-3 text-[17px] font-semibold'
            href={'/user/voucher/history'}
          >
            History
          </Link>
        }
      />
      <div className=' h-[0.80px] bg-tayaGrey'></div>
      <VoucherSidebar useNow />
    </FullPageContent>
  );
}
