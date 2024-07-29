'use client';
import Following from '@/components/profileMenu/following';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import { useTranslation } from 'next-i18next';

export default function Page() {
  const { t } = useTranslation();

  return (
    <FullPageContent className='bg-[#050505]'>
      <NavHeader label={t('following')} />
      <div className=' h-[0.80px] border-t border-[#FFFFFF0F]' />
      <Following />
    </FullPageContent>
  );
}
