'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { register } from 'swiper/element/bundle';
import { CommonPerpetual } from './commonPerpetual';
import ErrorModal from '../errorModal';
import TopUpRedirect from '../profileMenu/topUpSlider/components/topUpRedirect';
import { useDispatch } from 'react-redux';
import { BetSuccessfulModal } from '../betCart/BetSuccessfulModal';
import useUser from '@/hook/user/useUser';

import { updateBetSetting } from '@/store/betCart';
import { LocalStorageKeys } from '@/config/common';
import { DownloadBanner } from '@/componentsH5/DownloadBanner';
import { BottomPerpetual } from './BottomPerpetual';
import { UserGuides } from './UserGuide';
import { useAchievement } from './useAchievement';
import { DownloadSlides } from '../userGuide/DownloadSlides';
import { SpeechBubble } from '../privateMsgRoom/SpeechBubble';

// register Swiper custom elements
register();
export const H5Perpetual = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const { isStaticRewardCompleted } = useAchievement();

  useEffect(() => {
    dispatch(
      updateBetSetting({
        name: 'format',
        value: Number(localStorage.getItem(LocalStorageKeys.OddsFormat)) || 1,
      })
    );
  }, [pathname]);

  const dispatch = useDispatch();
  const { user } = useUser();

  useEffect(() => {
    if (user && user?.setup_required) {
      router.push('/user/finish_setup');
    }
  }, [user]);

  return (
    <>
      <CommonPerpetual />
      <TopUpRedirect />
      <BetSuccessfulModal />
      <DownloadBanner />
      <BottomPerpetual />
      <ErrorModal />
      {!isStaticRewardCompleted && <UserGuides />}
      <DownloadSlides />
      <SpeechBubble />
    </>
  );
};
