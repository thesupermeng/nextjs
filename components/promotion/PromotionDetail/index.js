import { LoadingPage } from '@/components/loading';
import { NodataV2 } from '@/components/noDataV2';
import { ProfileModalType } from '@/components/profileModal';
import { PromotionProgress } from '@/components/promotion/PromotionDetail/PromotionProgress';
import { RightSidebarContantTypes } from '@/components/rightSideMenu';
import { ScrollContentVertical } from '@/components/ScrollContentVertical';
import { Button } from '@/componentsH5/button';
import { PROMOTION_TYPE } from '@/config/User/promotion';
import { useCurrentPromotion } from '@/hook/user/usePromotions';
import useUser from '@/hook/user/useUser';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  hideRightBarContent,
  setProfileModal,
  showRightBarContent,
} from '@/store/common';
import { isWeb } from '@/util/common';
import { handleInAppWebview } from '@/util/inAppHandler';

export const PromotionDetail = () => {
  const { amountNeeded, currentPromotion, isLoading } = useCurrentPromotion();
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();
  const { isLogin } = useUser();
  const [descriptionImage, setDescriptionImage] = useState('');
  const bottomBtnText = useMemo(() => {
    if (!isLogin) {
      //todo add translation
      return 'Login to deposit';
    }
    // return currentPromotion?.type === PROMOTION_TYPE.FirstDepositInsurance ||
    //   currentPromotion?.type === PROMOTION_TYPE.FirstDepositBonus ||
    //   amountNeeded <= 0
    //   ? t('topUpNow') //this is == 'Deposit Now' on excel sheets
    //   : `${t('topUp')} $${amountNeeded}`;
    return t('topUpNow');
  }, [isLogin]);

  const gotoLogin = () => {
    isWeb()
      ? dispatch(setProfileModal(ProfileModalType.LoginModal))
      : router.push('/user/login');
  };

  const onClick = () => {
    if (!isLogin) {
      if (window.flutter_inappwebview?.callHandler) {
        handleInAppWebview('login');
        return;
      } else {
        gotoLogin();
      }
    } else {
      if (isWeb()) {
        dispatch(hideRightBarContent('All'));
        dispatch(showRightBarContent(RightSidebarContantTypes.Deposit));
      } else {
        if (window.flutter_inappwebview?.callHandler) {
          handleInAppWebview('deposit', (result) => {
            if (result) router.refresh();
          });
        } else {
          router.push(`/user/deposit`);
        }
      }
    }
  };

  useEffect(() => {
    if (isWeb()) {
      setDescriptionImage(currentPromotion?.description?.web);
    } else {
      setDescriptionImage(currentPromotion?.description?.h5);
    }
  }, [currentPromotion]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!currentPromotion) {
    return <NodataV2 />;
  }

  return (
    <>
      <ScrollContentVertical>
        {currentPromotion?.image ? (
          <Image
            alt='promo'
            className={`object-contain w-full ${
              isWeb() ? 'h-[240px]' : 'h-[190px]'
            }`}
            height={240}
            width={600}
            onError={(e) => (e.target.style.opacity = '0')}
            src={currentPromotion?.image}
          />
        ) : null}

        <div className=''>
          {isLogin &&
            PROMOTION_TYPE.NewAppLoginReward !== currentPromotion?.type && (
              <div className='p-5'>
                <PromotionProgress />
              </div>
            )}

          <div>
            {descriptionImage && (
              <img
                alt='promo'
                className={`object-cover h-auto w-full block`}
                onError={(e) => {
                  setDescriptionImage('');
                }}
                src={descriptionImage}
              />
            )}
          </div>
        </div>
      </ScrollContentVertical>

      {PROMOTION_TYPE.NewAppLoginReward !== currentPromotion?.type && (
        <Button buttonColor='capitalize' onClick={onClick}>
          {bottomBtnText}
        </Button>
      )}
    </>
  );
};
