import { IconArrowLeft } from '@/asset/icons';
import { PromotionDetail } from '@/components/promotion/PromotionDetail';
import { RightMenuLayout } from '@/components/rightMenuLayout';
import { useCurrentPromotion } from '@/hook/user/usePromotions';
import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import { hideRightBarContent } from '@/store/common';

export const Promotion = () => {
  const dispatch = useDispatch();
  const { currentPromotion } = useCurrentPromotion();

  const onClickBack = () => {
    dispatch(hideRightBarContent('All'));
  };

  return (
    <RightMenuLayout>
      <div className='flex items-center p-5' onClick={() => onClickBack()}>
        <Image
          alt='back'
          className='cursor-pointer flex-initial w-9 h-9 opacity-20 hover:opacity-100 transition-all mr-5'
          src={IconArrowLeft}
        />
        {currentPromotion?.name}
      </div>

      <PromotionDetail />
    </RightMenuLayout>
  );
};
