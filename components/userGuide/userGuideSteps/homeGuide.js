'use client';
import { ProfileDeposit } from '@/asset/icons';
import { FullPageContent } from '@/componentsH5/FullPageContent';
import { FooterButton } from '@/componentsH5/NavFooter/NavFooter';
import React, { useEffect, useState } from 'react';
import { NavItem } from '../../sidebar/buttons/TabBarButton';
import { LottieAnimation } from '../../lottie';
import { PointerLottie } from '@/asset/lottie';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { UserGuideStages, setUserGuideStep } from '@/store/userGuide';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

export const HomeGuide = () => {
  const [toRect, setToRect] = useState({});
  const [toRectMore, setToRectMore] = useState({});
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const route = useRouter();
  useEffect(() => {
    let check = null;
    const updateToRect = () => {
      try {
        const rect = document
          .getElementById('deposit-button')
          .getBoundingClientRect();
        setToRect(rect);
        const rectMore = document
          .getElementById('footer-more')
          .getBoundingClientRect();
        setToRectMore(rectMore);
      } catch (e) {
        setToRect({});
        setToRectMore({});
      }
    };

    updateToRect();

    check = setInterval(updateToRect, 500);
    window.addEventListener('resize', updateToRect);

    return () => {
      window.removeEventListener('resize', updateToRect);
      clearInterval(check);
    };
  }, []);

  if (!toRect?.x) {
    return null;
  }
  return (
    <FullPageContent className='bg-black/80 z-50 '>
      <div
        className={`fixed cursor-pointer`}
        style={{
          left: toRect.x + 'px',
          top: toRect.y - 80 + 'px',
          width: '70%',
        }}
      >
        <p className='text-yellowGuide'>{t('step1')}</p>
        <span>
          <span>{t('choose')}</span>
          <span className='text-yellowGuide'>{t('deposit')}</span>
          <span>&apos; {t('toTopupEastRichWallet')}</span>
        </span>
      </div>
      <div
        className={`fixed`}
        style={{
          left: toRect.x + 'px',
          top: toRect.y + 'px',
        }}
        onClick={() => {
          dispatch(setUserGuideStep(UserGuideStages.DepositGuide));
          route.push('/user/deposit');
        }}
      >
        <div>
          <div
            className='flex gap-2 rounded-[10px] bg-tayaGrey py-4 px-2.5'
            style={{ width: toRect.width, height: toRect.height }}
          >
            <div className='relative'>
              <Image alt={'deposit'} src={ProfileDeposit} className='w-6 h-6' />
            </div>
            <div className='font-medium text-[15px] truncate'>
              {t('deposit')}
            </div>
          </div>
        </div>
        {/* <BalanceOption
          style={{ width: toRect.width, height: toRect.height }}
          icon={ProfileDeposit}
          text={'deposit'}
          link='/user/deposit'
        /> */}
        <LottieAnimation
          src={PointerLottie}
          tw={'w-[53px] absolute right-0 top-3'}
        />
      </div>

      <FooterButton
        data={{ ...NavItem.userMore, link: '' }}
        style={{
          left: toRectMore.x,
          top: toRectMore.y + 10,
          position: 'fixed',
        }}
      />
    </FullPageContent>
  );
};
