'use client';

import Footer from '@/components/Footer';
import { H5Only, WEBOnly } from '@/components/Fragments/EnvComponent';
import { LoadingPage } from '@/components/loading';
import { NodataV2 } from '@/components/noDataV2';
import { PageContent } from '@/components/pageElement/PageContent';
import { Pageheader } from '@/components/pageElement/PageHeader';
import { PromotionCard } from '@/components/promotion/PromotionCard';
import { NavItem } from '@/components/sidebar/buttons/TabBarButton';
import { NavFooter } from '@/componentsH5/NavFooter/NavFooter';
import { usePromotions } from '@/hook/user/usePromotions';
import { useEffect } from 'react';
import { hideRightBarContent } from '@/store/common';
import { useDispatch } from 'react-redux';
import { isWeb } from '@/util/common';
import { useOffsetPosition } from '@/hook/useOffsetPosition';

export default function Page() {
  const { promotionList, isLoading } = usePromotions();
  const dispatch = useDispatch();
  const { checkOffset } = useOffsetPosition();

  useEffect(() => {
    return () => {
      isWeb() && dispatch(hideRightBarContent('All'));
    };
  }, []);

  if (isLoading) {
    return <LoadingSection />;
  }

  return (
    <>
      <WEBOnly>
        <PageContent
          header={<Pageheader navItem={NavItem.promotion}></Pageheader>}
        >
          {!promotionList || promotionList?.length <= 0 ? (
            <NodataV2 />
          ) : (
            <div className='flex flex-wrap gap-8'>
              {promotionList?.map((item) => {
                return (
                  <PromotionCard
                    key={`promocard-${item.id}`}
                    promoItem={item}
                  />
                );
              })}
            </div>
          )}
        </PageContent>
      </WEBOnly>

      <H5Only>
        <div
          style={{ marginTop: `${checkOffset(7)}rem` }}
          className={`overflow-y-auto flex  px-3`}
        >
          <div className='w-full grid gap-9'>
            {!promotionList || promotionList?.length <= 0 ? (
              <NodataV2 />
            ) : (
              <>
                {promotionList?.map((item) => (
                  <PromotionCard
                    key={`promocard-${item.id}`}
                    promoItem={item}
                  />
                ))}
              </>
            )}

            <Footer />
          </div>
        </div>

        <NavFooter />
      </H5Only>
    </>
  );
}

const LoadingSection = () => {
  return (
    <>
      <WEBOnly>
        <LoadingPage />
      </WEBOnly>

      <H5Only>
        <div className='fixed inset-0 bg-[#111] z-10'>
          <LoadingPage />
        </div>
      </H5Only>
    </>
  );
};
