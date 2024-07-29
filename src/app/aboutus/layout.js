'use client';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import { isWeb } from '@/util/common';
import { useTranslation } from 'next-i18next';

export default function Layout({ children }) {
  const { t } = useTranslation();

  return isWeb() ? (
    <>{children}</>
  ) : (
    <FullPageContent>
      <NavHeader label={t('helpCenter')} />
      {children}
    </FullPageContent>
  );
}
