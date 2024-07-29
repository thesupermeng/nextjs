import { PROMOTION_TYPE } from '@/config/User/promotion';
import { RedeemableType } from '@/hook/user/usePromotions';

export const getWalletText = (t, currentPromotion, status) => {
  switch (currentPromotion.type) {
    case PROMOTION_TYPE.FirstDepositInsurance:
    case PROMOTION_TYPE.FirstDepositBonus:
      switch (status) {
        case RedeemableType.pending:
        case RedeemableType.available:
          return { text: t('firstDeposit') };
      }
      break;
    case PROMOTION_TYPE.RedepositInsurance:
      switch (status) {
        case RedeemableType.pending:
        case RedeemableType.available:
          return { text: t('highestDepositAmount') };
      }
      break;
    case PROMOTION_TYPE.AccuralReward:
      switch (status) {
        case RedeemableType.pending:
        case RedeemableType.available:
        case RedeemableType.done:
          return { text: t('todayDepositAmount') };
      }
  }
  return {};
};
