import { FullPageContent } from '@/componentsH5/FullPageContent';
import { Button } from '@/componentsH5/button';
import { showKeyboard } from '@/store/common';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LottieAnimation } from '../../lottie';
import { PointerLottie } from '@/asset/lottie';
import CustomTopUpAmt from '../../profileMenu/topUpSlider/components/customTopUpAmt';
import { useTranslation } from 'next-i18next';
import { UserGuideStages, setUserGuideStep } from '@/store/userGuide';
import { useAchievement } from '@/components/Perpetual/useAchievement';
import useUser from '@/hook/user/useUser';
import { formatCredit } from '@/util/numbers';

export const DepositGuide = ({ reward, minAmount }) => {
  const [toRectAmount, setToRectAmount] = useState({});
  const [toRectButton, setToRecButton] = useState({});
  const dispatch = useDispatch();
  const { isShowKeyboard } = useSelector((s) => s.common);
  const { t } = useTranslation();
  const { completeTutorial } = useAchievement();
  const { isLogin } = useUser();

  useEffect(() => {
    let check = null;
    const updateToRect = () => {
      try {
        const rect = document
          .getElementById('deposit-now-button')
          .getBoundingClientRect();
        setToRecButton(rect);
        const rectAmount = document
          .getElementById('custom-top-up')
          .getBoundingClientRect();
        setToRectAmount(rectAmount);
      } catch (e) {
        setToRecButton({});
        setToRectAmount({});
      }
    };

    updateToRect();
    check = setInterval(updateToRect, 500);
    window.addEventListener('resize', updateToRect);

    return () => {
      window.removeEventListener('resize', updateToRect);
      clearInterval(check);
    };
  }, [isShowKeyboard]);

  useEffect(() => {
    dispatch(showKeyboard(false));
  }, []);

  if (!toRectButton?.x) {
    return null;
  }
  return (
    <FullPageContent className='bg-black/80'>
      <div
        className='fixed'
        style={{
          left: toRectAmount.x + 'px',
          top: toRectAmount.y - 15 + 'px',
          width: toRectAmount.width,
        }}
      >
        <CustomTopUpAmt selectedAmt={5} />
      </div>
      <div
        className={`fixed mx-2 text-17`}
        style={{
          left: toRectButton.x + 'px',
          top: toRectButton.y - 150 + 'px',
        }}
      >
        <span>
          <span className='text-yellowGuide'>{t('step2')} </span>

          <span>{t('clickThe')}</span>
          <span className='text-yellowGuide'>
            {t('deposit')} {formatCredit(minAmount)}{' '}
          </span>
          <span>&apos; {t('buttonToProceed')}</span>
          <span className='text-yellowGuide'>
            {t('free')} {formatCredit(reward || 0)}{' '}
          </span>
          <span>{t('willCreditedToWallet')}</span>
        </span>

        <p
          onClick={() => {
            isLogin && completeTutorial();
            dispatch(setUserGuideStep(null));
          }}
          className='text-[14px] mt-3'
        >
          {t('skip')}
        </p>
      </div>
      <div
        className={`fixed`}
        style={{
          top: toRectButton.y - 3 + 'px',
        }}
      >
        <Button
          onClick={() => {
            isLogin && completeTutorial();
            dispatch(setUserGuideStep(UserGuideStages.Register));
          }}
          className='bg-transparent'
          style={{ width: toRectButton.width, height: toRectButton.height }}
        >
          {t('deposit')} {formatCredit(minAmount)}
        </Button>
        <LottieAnimation
          src={PointerLottie}
          tw={'w-[53px] absolute left-10 top-3'}
        />
      </div>
    </FullPageContent>
  );
};
