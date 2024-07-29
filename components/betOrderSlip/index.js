'use client';
import { Card } from '@material-tailwind/react';
import React from 'react';
import { ScrollContentVertical } from '../ScrollContentVertical';
import { useDispatch, useSelector } from 'react-redux';
import { formatCredit } from '@/util/numbers';
import { formatDate } from '../matchHistory/utils';
import { useCalculateStakes } from '@/hook/FB/useCalculateStakes';
import {
  setAllBetOptions,
  setJumpLineData,
  setStakesParley,
} from '@/store/betCart';
import { Button } from '@/componentsH5/button';
import { useRouter } from 'next/navigation';
import { isWeb } from '@/util/common';
import { hideRightBarContent } from '@/store/common';
import { RightSidebarContantTypes } from '../rightSideMenu';
import { RightMenuLayout } from '../rightMenuLayout';
import { RightMenuHeader } from '../rightMenuLayout/rightMenuHeader';
import { useTranslation } from 'next-i18next';
import { WEBOnly } from '../Fragments/EnvComponent';
import { DetailsCard } from './DetailsCard';
import { setSelectedVoucher } from '@/store/voucher';
import { setOrderIdsToCheck } from '@/store/orders';

export const BetOrderSlip = () => {
  const { options } = useSelector((s) => s.betCart);
  const { totalPayment, totalReturn } = useCalculateStakes();
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();
  const onReset = () => {
    reset();
    router.push('/');
    if (isWeb) {
      dispatch(hideRightBarContent(RightSidebarContantTypes.OrderSlip));
    }
  };

  const onBack = () => {
    reset();
    router.push('/sports');
    if (isWeb) {
      dispatch(hideRightBarContent(RightSidebarContantTypes.OrderSlip));
    }
  };

  const reset = () => {
    dispatch(setAllBetOptions({}));
    dispatch(setJumpLineData({}));
    dispatch(setStakesParley({}));
    dispatch(setSelectedVoucher(null));
    dispatch(setOrderIdsToCheck([]));
  };

  return (
    <>
      <RightMenuLayout>
        <WEBOnly>
          <RightMenuHeader
            onClose={reset}
            className='p-4'
            tabs={[{ label: t('betSlip') }]}
            selected={0}
          ></RightMenuHeader>
        </WEBOnly>
        <ScrollContentVertical className='p-4 gap-2'>
          <Card className='bg-[#191A1D] flex flex-row justify-between p-4 text-white'>
            <div className='flex flex-col gap-1'>
              <p className='text-[#AEAEAE] text-sm'>{t('betAmount')}</p>
              <p className='text-[16px] font-medium'>
                {formatCredit(totalPayment)}
              </p>
            </div>
            <div className='text-right flex flex-col gap-1'>
              <p className='text-[#AEAEAE] text-sm'>{t('estReturn')}</p>
              <p className='text-[#FCC511] font-semibold text-[16px]'>
                {formatCredit(totalReturn)}
              </p>
            </div>
          </Card>

          <div className='h-2'></div>
          <p className='font-semibold'>{t('bettingList')}</p>

          {Object.keys(options).map((marketId) => {
            return (
              <DetailsCard
                key={marketId}
                options={options}
                marketId={marketId}
              />
            );
          })}

          <div className='h-2'></div>
          <p className='font-semibold'>{t('orderDetail')}</p>
          <Card className='bg-[#191A1D] justify-between p-4 text-xs gap-2 text-white'>
            <div className='flex gap-2'>
              <p>{t('paymentTime')} : </p>
              <p className='text-[#AEAEAE]'>
                {/* 21/10/2023 22:03 */}
                {formatDate(Date.now())}
              </p>
            </div>
            <div className='flex gap-2'>
              <p>{t('paymentType')} : </p>
              <p className='text-[#AEAEAE]'>{t('wallet')}</p>
            </div>
          </Card>
        </ScrollContentVertical>

        <Button onClick={onBack} className='bg-transparent' buttonColor='my-0'>
          {t('betAgain')}
        </Button>
        <Button
          buttonColor='bg-transparent'
          className='bg-transparent'
          onClick={onReset}
        >
          {t('backToHome')}
        </Button>
      </RightMenuLayout>
    </>
  );
};
