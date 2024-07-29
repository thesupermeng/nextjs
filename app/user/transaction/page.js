'use client';
import OrderHistory from '@/components/profileMenu/orderHistory';
import Transactions from '@/components/profileMenu/transactions';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <FullPageContent>
      <NavHeader label={t('transaction')} onBack={() => router.push('/')} />
      <div className='flex flex-col overflow-y-auto flex-[1_0_0] bg-[#121212]'>
        <Transactions />
      </div>
    </FullPageContent>
  );
}
