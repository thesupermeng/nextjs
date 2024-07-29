'use client';
import { ScrollContentVertical } from '@/components/ScrollContentVertical';
import { VoucherDetail } from '@/components/voucher/VoucherDetail';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import React from 'react';
import { useSelector } from 'react-redux';

export default function Page() {
  const selectedVoucher = useSelector((s) => s.voucher.selectedVoucher);

  return (
    <FullPageContent>
      <NavHeader label={'Voucher T&Cs'} />

      <ScrollContentVertical className='p-4 bg-darkGrey'>
        <VoucherDetail selectedVoucher={selectedVoucher} />
      </ScrollContentVertical>
    </FullPageContent>
  );
}
