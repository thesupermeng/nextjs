import React, { useCallback, useEffect } from 'react';
import { WEBOnly } from '../Fragments/EnvComponent';
import { isWeb } from '@/util/common';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { RightSidebarContantTypes } from '../rightSideMenu';
import { RightBetCartWidth } from '@/app/page';
import RechargeHeader from './rechargeHeader';
import { Button } from '@/componentsH5/button';
import { useRouter } from 'next/navigation';
import { hideRightBarContent, showRightBarContent } from '@/store/common';
import { formatDate } from '../matchHistory/utils';
import { handleInAppWebview } from '@/util/inAppHandler';
import Image from 'next/image';
import { DepositBonusIcon } from '@/asset/icons';

const Content = ({ title, content, className = '' }) => {
  const titleCss = 'text-[15px] font-bold';
  const contentCss = 'text-[#AEAEAE] font-medium text-sm';
  return (
    <div>
      <p className={`${titleCss}`}>{title}</p>
      <p className={`${contentCss} ${className}`}>{content}</p>
    </div>
  );
};

export const RechargeResult = ({ receivedParams }) => {
  const { rechargeInfo: receivedParams2 } = useSelector((s) => s.recharge);
  const { t } = useTranslation();
  const data = receivedParams || receivedParams2;
  const { amount, order_number, ts, status, deposit_bonus } = data;
  const type = {
    ['Succeed']: 'text-[#05AF0B]',
    ['Failed']: 'text-[#F3293A]',
  };
  const { rightBarContent } = useSelector((s) => s.common);
  const router = useRouter();
  const dispatch = useDispatch();
  const userGuideStep = useSelector((s) => s.userGuide.currentStep);

  const onDoneClick = useCallback(() => {
    if (isWeb()) {
      dispatch(hideRightBarContent('All'));
      dispatch(showRightBarContent(RightSidebarContantTypes.Transactions));
    } else {
      if (window.flutter_inappwebview?.callHandler) {
        handleInAppWebview('backPage');
        return;
      } else {
        router.push('/user/transaction');
      }
    }
  }, [userGuideStep]);

  // todo move to process top up
  // useEffect(() => {
  //   if (deposit_bonus) {
  //     //complete achievement
  //     completeAchievement(config?.static_promotion?.reward_achievement_id);
  //   }
  // }, [deposit_bonus]);

  return (
    <div
      className={`${
        isWeb()
          ? `fixed z-30 right-0 top-0 bottom-0 bg-black opacity-100 ${
              rightBarContent[RightSidebarContantTypes.RechargeInfo]
                ? RightBetCartWidth
                : 'h-0 w-0 opacity-0 pointer-events-none overflow-hidden'
            }`
          : ''
      } flex flex-col flex-1`}
    >
      <WEBOnly>
        <RechargeHeader />
      </WEBOnly>

      <div className='flex flex-col justify-between h-full'>
        <div>
          <p className={`text-xs ${isWeb() ? 'mx-5 mb-3' : 'm-5'}`}>
            {t('paymentDetails')}
          </p>
          <div className='bg-tayaGrey rounded-lg mx-5 p-3 flex flex-col gap-3'>
            <Content title={t('paymentMethod')} content={'CoinPal'} />
            <Content
              title={t('paymentTime')}
              content={ts ? formatDate(parseInt(ts * 1000)) : '-'}
            />
            <Content title={t('orderNo')} content={order_number ?? '-'} />
            <Content title={t('topUpAmount')} content={amount ?? '-'} />
            <Content
              title={t('status')}
              content={status ?? '-'}
              className={`${type[status]}`}
            />
          </div>
          {deposit_bonus && (
            <div className='bg-[#DE173E33] rounded-lg mx-5 p-3 flex flex-col gap-3 mt-3'>
              <div className='flex gap-2 items-center'>
                <Image
                  src={DepositBonusIcon}
                  alt='DepositBonusIcon'
                  width={22}
                  height={22}
                />
                <p className='font-semibold text-15'>{t('congratulations')}!</p>
              </div>
              <div className='font-medium text-sm'>{deposit_bonus}</div>
            </div>
          )}
        </div>

        <Button onClick={onDoneClick} disabled={false}>
          {t('done')}
        </Button>
      </div>
    </div>
  );
};
