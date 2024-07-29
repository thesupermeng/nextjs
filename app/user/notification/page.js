'use client';
import { NotificationList } from '@/components/notification/notificationList';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import React from 'react';
import { useTranslation } from 'next-i18next';

export default function Page() {
  const { t } = useTranslation();

  return (
    <FullPageContent className='bg-[#050505]'>
      <NavHeader label={t('notification')} />
      <div className=' h-[0.80px] border-t border-[#FFFFFF0F]' />
      <NotificationList />
    </FullPageContent>
  );
}
