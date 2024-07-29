'use client';
import { BetOrderSlip } from '@/components/betOrderSlip';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import { useTranslation } from 'next-i18next';

export default function Page({ params }) {
  const { t } = useTranslation();
  return (
    <FullPageContent>
      <NavHeader label={t('betSlip')} />
      <BetOrderSlip />
    </FullPageContent>
  );
}
