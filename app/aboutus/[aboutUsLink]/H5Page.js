'use client';
import { AboutUsLinksData } from '@/components/Footer/Links';
import useHtmlContent, { HtmlType } from '@/hook/useHtmlContent';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import { HtmlContent } from './HtmlContent';
import FaqContent from '@/components/faq';

export default function Page({ params }) {
  const pathname = usePathname();
  const { htmlContent: TNC } = useHtmlContent(HtmlType.tc);
  const { t } = useTranslation();

  const tncClasses = `terms-pop flex flex-col flex-[1_0_0] overflow-y-auto text-13`;

  return (
    <>
      <div className={` flex flex-row overflow-x-auto p-4 gap-2 flex-none`}>
        {AboutUsLinksData.map((link) => {
          return (
            <Link
              replace
              key={link.link}
              href={link.link}
              className={`flex-initial rounded-[8px] py-2 px-2.5 text-[13px] font-semibold whitespace-nowrap mr-2 last:mr-0 ${
                pathname === link.link ? 'bg-[#DE173E52]' : 'bg-tayaGrey'
              }`}
            >
              {t(link.title)}
            </Link>
          );
        })}
      </div>

      <div className={`flex flex-col flex-1 px-4`}>
        {pathname === '/aboutus/termsandcondition' && (
          <HtmlContent content={TNC} tw={tncClasses} />
        )}
        {pathname === '/aboutus/faq' && <FaqContent />}
      </div>
    </>
  );
}
