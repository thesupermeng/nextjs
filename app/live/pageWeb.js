'use client';
import { Pageheader } from '@/components/pageElement/PageHeader';
import { NavItem } from '@/components/sidebar/buttons/TabBarButton';
import { PageContent } from '@/components/pageElement/PageContent';
import { LiveTypes } from './[type]/liveTypes/LiveTypes';

export const PageWeb = ({ children }) => {
  return (
    <>
      <PageContent
        header={
          <Pageheader navItem={NavItem.live}>
            <div className='flex flex-row flex-initial gap-5'>
              <LiveTypes />
            </div>
          </Pageheader>
        }
      >
        {children}
      </PageContent>
    </>
  );
};
