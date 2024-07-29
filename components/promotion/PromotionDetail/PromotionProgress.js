import { PROMOTION_TYPE } from '@/config/User/promotion';
import { Unit } from '@/config/User/setting';
import { RedeemableType, useCurrentPromotion } from '@/hook/user/usePromotions';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';
import { CountDown } from './elements/CountDown';
import { ProgressBar } from './elements/ProgressBar';
import { Wallet } from './elements/Wallet';
import { getCountDownText } from './utils/getCountDownText';
import { getWalletText } from './utils/getWalletText';
import { Card } from './elements/Card';

export const PromotionProgress = () => {
  const {
    amountNeeded,
    currentPromotion,
    currentTier,
    redeemableStatus,
    mutateCurrentPromotion,
  } = useCurrentPromotion();
  const { t } = useTranslation();

  const progressPercentage =
    (currentPromotion?.promotion_progress?.progress /
      currentPromotion?.promotion_progress?.tiers[currentTier]?.max) *
    100;

  const walletText = useMemo(
    () => getWalletText(t, currentPromotion, redeemableStatus),
    [currentPromotion, redeemableStatus]
  );

  const countdownData = useMemo(
    () => getCountDownText(t, currentPromotion, redeemableStatus),
    [t, currentPromotion, redeemableStatus]
  );
  return (
    <>
      {countdownData.time ? (
        <CountDown
          text={countdownData.text}
          endTime={countdownData.time}
          onCountdownEnd={() => {
            mutateCurrentPromotion((a) => {
              return { ...a, countDownEndTime: new Date().getTime() };
            });
          }}
        />
      ) : null}

      <div className='rounded-lg bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#6f6f6f] via-[#303132] to-[#18191B] p-5'>
        {walletText.text && (
          <Wallet
            left={walletText.text}
            right={`${
              currentPromotion?.promotion_progress?.progress || 0
            } ${Unit}`}
          />
        )}

        {currentPromotion?.type === PROMOTION_TYPE.AccuralReward &&
          RedeemableType.pending && (
            <ProgressBar percent={progressPercentage} />
          )}

        <Card
          promotion={currentPromotion}
          status={redeemableStatus}
          amountNeeded={amountNeeded}
          currentTier={currentTier}
        ></Card>
      </div>
    </>
  );
};
