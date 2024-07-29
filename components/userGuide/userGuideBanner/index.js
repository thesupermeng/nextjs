'use client';
import { GreyCross, UserGuideBg } from '@/asset/icons';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/componentsH5/button';
import CountDownTimer from '../countDownTimer';
import { useTranslation } from 'next-i18next';
import useFakeUserCount from '@/hook/common/useFakeUserCount';
import { formatCreditWholeNum } from '@/util/numbers';
import { Config } from '@/util/config';
import { useRouter } from 'next/navigation';
import { UserGuideStages, setUserGuideStep } from '@/store/userGuide';
import { useDispatch, useSelector } from 'react-redux';

const timeoutMs = 60 * 1000 * 15; // 15 mins

export const UserGuideBanner = ({ config, reward, minAmount }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userCount = useFakeUserCount();
  const router = useRouter();
  const [showUserGuide, setShowUserGuide] = useState(true);

  useEffect(() => {
    if (!showUserGuide) {
      const timeoutId = setTimeout(() => {
        setShowUserGuide(true);
      }, timeoutMs);

      return () => clearTimeout(timeoutId);
    }
  }, [showUserGuide]);

  return (
    <FullPageContent
      className={`transition-transform transform  bg-black/80 z-50 items-center justify-center ${
        showUserGuide
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0'
      }`}
    >
      <div className='flex flex-col items-center justify-center mx-5'>
        <Image src={UserGuideBg} alt='UserGuideBg' width={316} />

        <div className='-mt-6 w-[316px] bg-black shadow flex flex-col items-center justify-center text-center py-5'>
          <p className='text-[22px] font-semibold'>{t('limitedTimeOffer')}</p>
          <CountDownTimer />
          <div className='text-center text-[16px] mb-3'>
            <span>{t('completeDepositUserGuide')} </span>
            <div>
              <span>{t('promotionToGet')} </span>
              <span className='text-yellowGuide text-xl font-bold'>
                {reward || 0} {t('usdtFree')}
              </span>
            </div>
            <div>
              <span>{t('with')}</span>
              <span className='text-yellowGuide text-xl font-bold'>
                {minAmount} {t('usdtDeposit')}
              </span>
              <span>!</span>
            </div>
            <p>{t('dontMissOut')}</p>
          </div>

          <div className='text-center text-[16px] mb-3 w-[80%]'>
            <p>{t('hurry')} </p>
            <div>
              <span>{t('only')} </span>
              <span className='text-[#37ED3D] font-bold'>
                {formatCreditWholeNum(Config.userGuideSlots)}{' '}
              </span>
              <span>{t('slotAvailableJoin')}</span>
            </div>
            <div>
              <span className='text-[#37ED3D] font-bold'>
                {formatCreditWholeNum(userCount)} {t('erUser')}{' '}
              </span>
              <span>{t('limitedTimeOfferDMsg10')}</span>
            </div>
          </div>

          <Button
            className='bg-transparent w-full mx-5'
            onClick={() => {
              setTimeout(() => {
                dispatch(setUserGuideStep(UserGuideStages.HomeGuide));
              }, 100);
              router.push('/user/home');
            }}
          >
            {t('depositNow')}
          </Button>
        </div>

        <button onClick={() => setShowUserGuide(false)}>
          <Image
            src={GreyCross}
            alt='GreyCross'
            width={26.88}
            height={26.88}
            className='mt-3'
          />
        </button>
      </div>
    </FullPageContent>
  );
};
