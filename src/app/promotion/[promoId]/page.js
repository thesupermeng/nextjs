'use client';
import { LoadingPage } from '@/components/loading';
import { NodataV2 } from '@/components/noDataV2';
import { PromotionDetail } from '@/components/promotion/PromotionDetail';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import NavHeader from '@/componentsH5/headerH5/NavHeader';
import { useCurrentPromotion } from '@/hook/user/usePromotions';
import { useTranslation } from 'next-i18next';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedPromotionId } from '@/store/promotion';

export default function Page() {
  const { currentPromotion, isLoading } = useCurrentPromotion();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const pathname = usePathname();
  const pathnameLastPart = pathname.split('/').pop();

  useEffect(() => {
    dispatch(setSelectedPromotionId(pathnameLastPart));
  }, [pathnameLastPart]);

  return (
    <FullPageContent>
      {isLoading || !currentPromotion ? (
        <LoadingPage />
      ) : (
        <>
          <NavHeader
            label={currentPromotion ? currentPromotion?.name : t('promotion')}
          />
          {currentPromotion ? <PromotionDetail /> : <NodataV2 />}
        </>
      )}
    </FullPageContent>
  );
}
