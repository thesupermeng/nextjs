import { RightSidebarContantTypes } from '@/components/rightSideMenu';
import { PROMOTION_TYPE } from '@/config/User/promotion';
import { Unit } from '@/config/User/setting';
import {
  RedeemableType,
  useCurrentPromotion,
  usePostPromotion,
} from '@/hook/user/usePromotions';
import i18n from 'i18next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideRightBarContent } from '@/store/common';
import { isWeb } from '@/util/common';

export const RedeemButton = ({
  setIsRedeemSuccess = () => {},
  setSuccessMsg = () => {},
}) => {
  const [btnDisabled, setBtnDisabled] = useState(true);
  const dispatch = useDispatch();
  const { amountNeeded, currentPromotion, redeemableStatus } =
    useCurrentPromotion();
  const { postPromotion } = usePostPromotion();
  const router = useRouter();
  const buttonProps = determineButtonProps({ currentPromotion, amountNeeded })[
    redeemableStatus
  ];
  const isFirstInsuranceClaimed =
    currentPromotion?.type === PROMOTION_TYPE.FirstDepositInsurance &&
    redeemableStatus === RedeemableType.done;
  const isClickable =
    redeemableStatus === RedeemableType.available || isFirstInsuranceClaimed;

  useEffect(() => {
    if (isClickable) {
      setBtnDisabled(false);
    }
  }, []);

  const goToSports = () => {
    router.push('/sports/Eastrich');
    if (isWeb()) {
      dispatch(hideRightBarContent(RightSidebarContantTypes.Promotion));
    }
  };

  const redeemPromo = () => {
    const promoId = currentPromotion?.id;

    setBtnDisabled(true);
    postPromotion(promoId).then((data) => {
      if (data.code === 0) {
        setBtnDisabled(false);
        setIsRedeemSuccess(true);
        setSuccessMsg(data.msg);
      } else {
        setIsRedeemSuccess(false);
        console.error(data)
      }
    });
  };

  const onClick = () => {
    if (isClickable) {
      isFirstInsuranceClaimed ? goToSports() : redeemPromo();
    }
  };

  return (
    <button
      className={`rounded p-3 w-full disabled:opacity-50 ${buttonProps.twClass}`}
      disabled={btnDisabled}
      onClick={onClick}
    >
      {buttonProps.text}
    </button>
  );
};

const determineButtonProps = ({ currentPromotion, amountNeeded }) => {
  return {
    [RedeemableType.available]: {
      text:
        currentPromotion?.type === PROMOTION_TYPE.FirstDepositInsurance
          ? i18n.t('claimAmountBetInsuranceVoucher', {
              amount: currentPromotion?.reward,
              unit: Unit,
            })
          : `${i18n.t('redeem')} ${currentPromotion?.reward} ${Unit}`,
      twClass: 'bg-[#fcc511] text-[#1A1B1E]',
    },
    [RedeemableType.pending]: {
      text:
        currentPromotion?.type === PROMOTION_TYPE.FirstDepositInsurance ||
        currentPromotion?.type === PROMOTION_TYPE.FirstDepositBonus
          ? i18n.t('pendingFirstTopUp')
          : `${i18n.t('pending')}: ${i18n.t('topUpAmountToRedeem', {
              amount: amountNeeded,
              unit: Unit,
            })}`,
      twClass: 'bg-[#FCC51133]',
    },
    [RedeemableType.done]: {
      text:
        currentPromotion?.type === PROMOTION_TYPE.FirstDepositInsurance
          ? i18n.t('useNow')
          : i18n.t('redeemed'),
      twClass: 'bg-[#555555]',
    },
    [RedeemableType.unavailable]: {
      text: i18n.t('unavailable'),
      twClass: 'bg-tayaGrey',
    },
  };
};
