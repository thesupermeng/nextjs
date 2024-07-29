'use client';
import { Pageheader } from '@/components/pageElement/PageHeader';
import { NavItem } from '@/components/sidebar/buttons/TabBarButton';
import { useParams, useRouter } from 'next/navigation';
import { LiveTypes } from './liveTypes/LiveTypes';
import { PageContent } from '@/components/pageElement/PageContent';

export const PageWeb = ({ children }) => {
  const params = useParams();
  const router = useRouter();
  const onTypeChange = (type) => {
    router.push(`/live/${type.id}`);
  };
  return (
    <>
      <PageContent
        header={
          <Pageheader navItem={NavItem.live}>
            <div className='flex flex-row flex-initial gap-5'>
              <LiveTypes selectedId={params.type} onTypeChange={onTypeChange} />
            </div>
          </Pageheader>
        }
      >
        {children}
      </PageContent>
    </>
  );
};
