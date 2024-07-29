import { useGetOrderStakeStatus } from '@/hook/FB/useGetStakeOrderStatus';
import { useMatchDetail } from '@/hook/FB/useMatchDetail';
import {
  setQuickBetProps,
  setShowSuccessfulModal,
  setSuccessModalProps,
} from '@/store/common';
import { setOrderIdsToCheck } from '@/store/orders';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import i18n from 'i18next';
import { LottieAnimation } from '../lottie';
import { DoneLottie, LoadingLottie } from '@/asset/lottie';
import { formatCredit, formatCreditWholeNum } from '@/util/numbers';
import { useRouter } from 'next/navigation';
import { isWeb } from '@/util/common';

export const BetSuccessfulModal = () => {
  const successModal = useSelector((s) => s.common.successModal);
  const successModalProps = useSelector((s) => s.common.successModalProps);
  const quickBetProps = useSelector((s) => s.common.quickBetProps);
  const { stakes } = useSelector((s) => s.betCart);
  const { t } = useTranslation();
  const { orderStatus } = useGetOrderStakeStatus();
  const [status, setStatus] = useState('');
  const data = successModalProps?.[0];
  const dispatch = useDispatch();
  const { matchDetail } = useMatchDetail(quickBetProps?.data?.matchId);
  const router = useRouter();
  const { jumpLine } = useSelector((s) => s.betCart);
  const thisJumpLine = jumpLine?.bms?.[quickBetProps?.id];

  useEffect(() => {
    if (orderStatus.length > 0 && data?.id) {
      setStatus(orderStatus?.[0]?.st);
      if (orderStatus?.[0]?.st === 4) dispatch(setOrderIdsToCheck([]));
    }
  }, [orderStatus]);

  const onClose = () => {
    dispatch(setShowSuccessfulModal(false));
    dispatch(setOrderIdsToCheck([]));
    dispatch(setSuccessModalProps({}));
    dispatch(setQuickBetProps({}));
  };

  if (!successModal) return null;

  return (
    <div
      onClick={onClose}
      className={`bg-black/30 px-3 z-[999] ${
        isWeb() ? 'absolute' : 'fixed'
      } top-0 bottom-0 left-0 right-0 flex flex-1 items-center justify-center`}
    >
      <div className='min-w-[300px] p-2 flex flex-col flex-initial backdrop-blur-lg rounded bg-[#191A1D] text-white text-lg font-semibold'>
        <div className='flex flex-col items-center justify-center'>
          <LottieAnimation
            src={status === 0 || status === 1 ? LoadingLottie : DoneLottie}
            isLoop={status === 0 || status === 1 ? true : false}
            tw={`w-16 h-16`}
          />
          {status === 0 || status === 1 ? (
            <p className=' opacity-90'>{t('confirming')}</p>
          ) : (
            <>
              <div className=' opacity-90'>{t('betSuccessful')}</div>
              <div className=' opacity-90'>{t('goodLuck')}</div>
            </>
          )}
        </div>
        {data?.id && orderStatus && (
          <div className='flex mt-3 gap-5'>
            <div className='text-xs text-[#AEAEAE] flex flex-col gap-1'>
              <p className=''>{data?.id}</p>
              <div className='flex gap-2 text-white'>
                <p className='font-normal'>{quickBetProps?.data?.betName}</p>
                <p className='font-bold'>{thisJumpLine?.op?.od}</p>
              </div>
              <p>{quickBetProps?.data?.nm}</p>
              <p>{new Date(matchDetail.bt).toLocaleString()}</p>
            </div>

            <div className='flex flex-col text-right flex-1 items-end'>
              <p className='text-white bg-black rounded-[4px] px-1 text-[10px]'>
                {ORDER_STATUS[status ? parseInt(status) : 0].text}
              </p>

              <p className='text-md font-semibold'>
                {formatCreditWholeNum(stakes[quickBetProps?.id])}
              </p>
              <span className='flex justify-end items-center flex-wrap whitespace-nowrap'>
                <span className='text-[11px] font-semibold mr-1'>
                  Possible win
                </span>
                <span className='text-sm text-[#FCC511] font-semibold'>
                  {formatCredit(
                    thisJumpLine?.op?.od * stakes[quickBetProps?.id]
                  )}
                </span>
              </span>
            </div>
          </div>
        )}
        {data?.id && orderStatus && (
          <>
            <div
              className='w-full my-2'
              onClick={() => router.push('/user/history')}
            >
              <button className='bg-[#DE173E] rounded-md  w-full text-sm py-2.5'>
                {t('bettingDetail')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export const ORDER_STATUS = [
  { text: i18n.t('created') },
  { text: i18n.t('confirming') },
  { text: i18n.t('rejected') },
  { text: i18n.t('canceled') },
  { text: i18n.t('confirmed') },
  { text: i18n.t('settled') },
];
