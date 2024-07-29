'use client';
import BetSetting from '@/components/betSetting';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import { useTranslation } from 'next-i18next';

export default function Page({ params }) {
  const { t } = useTranslation();

  return (
    <FullPageContent>
      <NavHeader label={t('betSetting')} />
      <div className='flex flex-[1_0_0] overflow-y-auto'>
        <BetSetting />
      </div>
    </FullPageContent>
  );
}
