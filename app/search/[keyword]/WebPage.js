'use client';
import { AboutUsLinksData } from '@/components/Footer/Links';
import { PageContent } from '@/components/pageElement/PageContent';
import { Pageheader } from '@/components/pageElement/PageHeader';
import useHtmlContent, { HtmlType } from '@/hook/useHtmlContent';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import { HtmlContent } from './HtmlContent';
import FaqContent from '@/components/faq';
import { EastRichWhiteLogo } from '@/asset/icons';
import { isWeb } from '@/util/common';

export default function Page({ params }) {
  const pathname = usePathname();
  const { htmlContent } = useHtmlContent(HtmlType.tc);
  const { t } = useTranslation();

  return (
    <>

  <p>Web</p>

    </>
  );
}
