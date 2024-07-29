import { IconArrowWhite, RedWallet } from '@/asset/icons';
import { clearHasOddChange, setAcceptOddChange } from '@/store/betCart';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BetCartFooterParley from './BetCartFooterParley';
import useSinglePassBet from '@/hook/FB/useSinglePassBet';
import useUser from '@/hook/user/useUser';
import useMultiplePassBet from '@/hook/FB/useMultiplePassBet';
import useBetRules from '@/hook/FB/useBetRules';
import {
  hideRightBarContent,
  setErrorModalProps,
  setProfileModal,
  setShowErrorModal,
  showRightBarContent,
} from '@/store/common';
import { setBalance } from '@/store/user';
import { isWeb } from '@/util/common';
import { formatCredit } from '@/util/numbers';
import { ProfileModalType } from '../profileModal';
import { RightSidebarContantTypes } from '../rightSideMenu';
import { useTranslation } from 'next-i18next';
import { VoucherRow } from '../voucher/VoucherRow';
import { useCalculateStakes } from '@/hook/FB/useCalculateStakes';
import { setOrderIdsToCheck } from '@/store/orders';
import { useVoucher } from '@/hook/api/useVoucher';
import { setSelectedVoucher } from '@/store/voucher';

export default function BetCartFooter({
  onBetSuccess,
  onBetFailed,
  setOpenTopUp,
}) {
  const dispatch = useDispatch();
  const [accept, setAccept] = useState(false);
  const { placeBet, getBetDetails } = useSinglePassBet();
  const { placeBetMultiple } = useMultiplePassBet();
  const { user, isLogin } = useUser();
  const { isValid } = useBetRules();
  const router = useRouter();
  const activeParlay = useSelector((s) => s.common.activeParlay);
  const { totalPayment, totalReturn } = useCalculateStakes();
  const [isLoading, setIsLoading] = useState(false);
  const { getApplicables } = useVoucher();
  const selectedVoucher = useSelector((s) => s.voucher.selectedVoucher);

  const { isSeries, options, hasOddChange, isAcceptOddChange } = useSelector(
    (s) => s.betCart
  );
  const optionsLength = Object.keys(options).length;
  const { t } = useTranslation();

  const onClickTopup = useCallback(() => {
    if (isWeb()) {
      if (!isLogin) {
        triggerLogin();
      } else {
        dispatch(hideRightBarContent('All'));
        dispatch(showRightBarContent(RightSidebarContantTypes.Deposit));
      }
    } else {
      if (!isLogin) {
        router.push('/user/login');
      } else {
        router.push('/user/deposit');
      }
    }
  }, [isLogin]);

  const onClickBet = useCallback(async () => {
    if (isLogin === null) {
      if (isWeb()) {
        triggerLogin();
      } else {
        router.push('/user/login');
      }
      return;
    }

    if (totalPayment > user?.sum?.balance) {
      if (isWeb()) {
        // dispatch(showRightBarContent(RightSidebarContantTypes.Deposit));
        // return;
      } else {
        setOpenTopUp(totalPayment - user?.sum?.balance);
        return;
      }
    }
    await callPlaceBetApi();
  }, [isSeries, placeBet, placeBetMultiple]);

  const callPlaceBetApi = async () => {
    setIsLoading(true);

    if (!isSeries) {
      // single bet
      await getBetDetails()
        .then((betDetails) => getApplicables(betDetails))
        .then((applicableData) => {
          if (
            !applicableData?.data?.find((e) => e?.id === selectedVoucher?.id) &&
            selectedVoucher?.id
          ) {
            dispatch(setShowErrorModal(true));
            dispatch(
              setErrorModalProps({
                message: t('invalidVoucher'),
                title: t('error'),
              })
            );
            dispatch(setSelectedVoucher(null));
            setIsLoading(false);
            return;
          } else {
            return placeBet().then((resp) => {
              try {
                if (resp.code === 0) {
                  onBetSuccess?.();
                  dispatch(setOrderIdsToCheck([resp?.data?.[0]?.id]));
                } else {
                  onBetFailed?.(resp.message);
                }
              } catch (e) {
                console.error('place single bet error', e);
              } finally {
                setIsLoading(false);
              }
            });
          }
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
          return;
        });
    } else {
      // multiple bet
      return placeBetMultiple().then((resp) => {
        try {
          if (resp.code === 0) {
            onBetSuccess?.();
            dispatch(setOrderIdsToCheck([resp?.data?.[0]?.id]));
          } else {
            onBetFailed?.(resp.message);
          }
        } catch (e) {
          console.error('place multiple bet error', e);
        } finally {
          setIsLoading(false);
        }
      });
    }
  };

  const onClickAccept = useCallback(() => {
    dispatch(clearHasOddChange([]));
  }, [isAcceptOddChange, hasOddChange]);

  useEffect(() => {
    if (hasOddChange.length > 0) {
      setAccept(false);
      dispatch(setAcceptOddChange(false));
    } else {
      setAccept(true);
      dispatch(setAcceptOddChange(true));
    }
  }, [hasOddChange]);

  useEffect(() => {
    if (user) {
      dispatch(setBalance(user?.sum?.balance));
    }
  }, [user]);

  const triggerLogin = () => {
    dispatch(setProfileModal(ProfileModalType.LoginModal));
  };

  return (
    <div className='flex flex-col flex-initial p-4 rounded-t-xl bg-tayaGrey text-[13px]'>
      {isSeries && optionsLength > 0 ? (
        <>
          <BetCartFooterParley />
        </>
      ) : (
        <></>
      )}

      {!activeParlay && (
        <>
          {!isSeries && <VoucherRow />}

          <Row
            left={
              <div className='flex gap-2'>
                <Image src={RedWallet} alt='wallet' width={20} height={20} />
                <p>Balance</p>
              </div>
            }
            right={
              <div
                className='flex items-center cursor-pointer'
                onClick={onClickTopup}
              >
                ({formatCredit(user?.sum?.balance)})
                <Image
                  alt='topup'
                  src={IconArrowWhite}
                  className='w-3 h-3 ml-2 -rotate-90'
                />
              </div>
            }
          />

          {/* last row */}
          <Row
            left={
              <div
                className={`flex-initial text-white ${
                  isWeb() ? '' : 'text-[11px] mr-10'
                }`}
              >
                <div>{t('estReturn')}</div>
                <div
                  className={`text-[#FCC511] font-semibold text-base ${
                    isWeb() ? '' : 'text-sm'
                  }`}
                >
                  {formatCredit(totalReturn)}
                </div>
              </div>
            }
            right={
              hasOddChange.length > 0 && !accept ? (
                <button
                  onClick={onClickAccept}
                  className={`flex rounded flex-1 text-white h-12 items-center justify-center  bg-gradient-to-br from-sky-500 to-sky-900`}
                >
                  <div className='flex-initial text-base font-semibold text-center'>
                    {t('acceptOddsChanges')}
                  </div>
                </button>
              ) : (
                <button
                  disabled={!isValid || totalPayment === 0 || isLoading}
                  onClick={onClickBet}
                  className={` flex rounded flex-1 text-white ${
                    isWeb() ? 'h-12' : 'h-10'
                  } items-center justify-center tayagradient ${
                    !isValid || totalPayment === 0 || isLoading
                      ? 'opacity-75'
                      : ''
                  } `}
                >
                  <div
                    className={`flex-initial text-base font-semibold text-center ${
                      isWeb() ? '' : '!text-[15px]'
                    }`}
                  >
                    {isLoading
                      ? t('loading')
                      : `${t('placeBet')} - 
                    ${formatCredit(totalPayment)}`}
                  </div>
                </button>
              )
            }
          />
        </>
      )}
    </div>
  );
}

const Row = ({ twClass = '', left, right }) => {
  return (
    <div
      className={`flex flex-initial flex-row gap-4 items-center py-1 mb-[10px] justify-between ${twClass}`}
    >
      <>
        {left}
        {right}
      </>
    </div>
  );
};
