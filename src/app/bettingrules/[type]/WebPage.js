'use client';
import { HtmlContent } from '@/app/aboutus/[aboutUsLink]/HtmlContent';
import { LiveTypes } from '@/app/live/[type]/liveTypes/LiveTypes';
import { PageContent } from '@/components/pageElement/PageContent';
import { Pageheader } from '@/components/pageElement/PageHeader';
import { NavItem } from '@/components/sidebar/buttons/TabBarButton';
import { useParams, useRouter } from 'next/navigation';
import { useRule } from './useRule';

export const WebPage = () => {
  const params = useParams();
  const router = useRouter();
  const onTypeChange = (type) => {
    router.replace(`/bettingrules/${type.id}`);
  };
  const ruleContent = useRule(params.type);
  return (
    <>
      <PageContent
        header={
          <Pageheader navItem={NavItem.bettingRules}>
            <div className='flex flex-row flex-initial gap-5'>
              <LiveTypes
                selectedId={params.type}
                onTypeChange={onTypeChange}
                isRules={true}
              />
            </div>
          </Pageheader>
        }
      >
        <HtmlContent content={ruleContent} tw='px-12 h-full' />
      </PageContent>
    </>
  );
};
