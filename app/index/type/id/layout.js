'use client';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import { isWeb } from '@/util/common';
import { useTranslation } from 'next-i18next';
export default function Layout({ children }) {
  const { t } = useTranslation();

  return isWeb() ? (

    <>{children}</>
  ) : (
    <>
    {/* <FullPageContent className="overflow-auto bg-dark-grey">

      {children}
    </FullPageContent> */}
    {children}
    </>
  );
}
