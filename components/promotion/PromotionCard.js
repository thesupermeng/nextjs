import { IconDefaultGames } from '@/asset/icons';
import { RightSidebarContantTypes } from '@/components/rightSideMenu';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { hideRightBarContent, showRightBarContent } from '@/store/common';
import { setSelectedPromotionId } from '@/store/promotion';
import { isWeb } from '@/util/common';
import { convertTimeStampToDate, formatDateToDashOnly } from '@/util/date';
import { PROMOTION_TYPE } from '@/config/User/promotion';
import { Button } from '@/componentsH5/button';

export const PromotionCard = ({ promoItem }) => {
  const { description, end_at, id, image, name } = promoItem;
  const endAtDate = convertTimeStampToDate(end_at * 1000);

  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();

  const navigateToRightSidebar = (type) => {
    dispatch(hideRightBarContent('All'));
    dispatch(showRightBarContent(type));
  };

  const onClick = (e) => {
    dispatch(setSelectedPromotionId(id));

    isWeb()
      ? navigateToRightSidebar(RightSidebarContantTypes.Promotion)
      : router.push(`/promotion/${id}`);
  };

  const LowerLeftCompo = useMemo(() => {
    if (promoItem.type !== PROMOTION_TYPE.NewAppLoginReward) {
      return isWeb() ? (
        <div>{t('topUpNow')} &gt;</div>
      ) : (
        <>
          {t('deadline')}: {formatDateToDashOnly(endAtDate)}
        </>
      );
    }
    return;
  }, [promoItem]);
  return (
    <div
      className={`group cursor-pointer flex flex-col ${
        isWeb() ? 'xl:w-[480px] w-[300px]' : ''
      }  `}
      onClick={onClick}
    >
      <div
        className='bg-center bg-contain bg-no-repeat aspect-[393/148] bg-[#222222] mb-1 overflow-hidden relative rounded-lg'
        style={{ backgroundImage: `url(${IconDefaultGames.src})` }}
      >
        <div
          className='bg-center bg-cover bg-no-repeat common-transition h-full w-full group-hover:scale-[1.1]'
          style={{ backgroundImage: `url(${image})` }}
        />

        {/* {!isWeb() && (
          <div className='absolute backdrop-blur bottom-0 left-0 right-0 flex px-3 py-1 text-xs'>
            <div className='ml-auto'>
              {t('deadline')}: {formatDateToDashOnly(endAtDate)}
            </div>
          </div>
        )} */}
      </div>

      <div>{name}</div>

      <div className='text-[#AEAEAE] text-sm w-full'>{description?.short}</div>

      {isWeb() && (
        <>
          <div className='text-[#AEAEAE] text-sm mb-4'>{LowerLeftCompo}</div>
          <Button className='bg-transparent !px-0 mt-auto'>
            {promoItem.type !== PROMOTION_TYPE.NewAppLoginReward
              ? t('topUpNow')
              : 'Details'}
          </Button>
        </>
      )}
    </div>
  );
};
