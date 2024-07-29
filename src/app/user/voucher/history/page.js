'use client';
import { VoucherHistory } from '@/components/voucher/VoucherHistory';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import React from 'react';

export default function Page() {
  return (
    <FullPageContent>
      <NavHeader label='History' />
      <div className=' h-[0.80px] bg-tayaGrey'></div>
      <VoucherHistory />
    </FullPageContent>
  );
}
