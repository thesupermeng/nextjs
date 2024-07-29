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
      <PageContent
        header={
          <div className='flex flex-initial flex-col'>
            <Pageheader
              navItem={{
                text: 'Help Center',
                translationKey: 'helpCenter',
                iconActive: EastRichWhiteLogo,
              }}
            />
            <div
              className={`flex-initial flex flex-row overflow-x-auto py-4 gap-3`}
            >
              {AboutUsLinksData.map((link) => {
                return (
                  <Link
                    replace
                    key={link.link}
                    href={link.link}
                    className={`flex-initial rounded-[8px] ${
                      pathname === link.link ? 'bg-[#DE173E52]' : 'bg-tayaGrey'
                    } py-3 px-5`}
                  >
                    {t(link.title)}
                  </Link>
                );
              })}
            </div>
          </div>
        }
      >
        {pathname === '/aboutus/termsandcondition' && (
          <HtmlContent
            content={htmlContent}
            tw={`${isWeb() ? 'text-sm' : 'text-sm'}`}
          />
        )}
        {pathname === '/aboutus/faq' && <FaqContent />}
      </PageContent>
    </>
  );
}
