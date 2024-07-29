'use client';
import { HtmlContent } from '@/app/aboutus/[aboutUsLink]/HtmlContent';
import { LiveTypes } from '@/app/live/[type]/liveTypes/LiveTypes';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import { useParams, useRouter } from 'next/navigation';
import { useRule } from './useRule';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import { useTranslation } from 'next-i18next';
import { NodataV2 } from '@/components/noDataV2';

export const H5Page = () => {
  const params = useParams();
  const router = useRouter();
  const ruleContent = useRule(params.type);
  const { t } = useTranslation();

  const onTypeChange = (type) => {
    router.replace(`/bettingrules/${type.id}`);
  };

  return (
    <>
      <FullPageContent className='!font-main'>
        <NavHeader label={t('bettingRules')} />
        <div className='flex flex-row flex-initial gap-5 px-4'>
          <LiveTypes
            selectedId={params.type}
            onTypeChange={onTypeChange}
            isRules={true}
          />
        </div>
        <div className='flex flex-[1_0_0] overflow-y-auto my-4 bg-darkGrey'>
          {ruleContent ? (
            <HtmlContent content={ruleContent} tw='px-12 h-full' />
          ) : (
            <NodataV2 />
          )}
        </div>
      </FullPageContent>
    </>
  );
};
