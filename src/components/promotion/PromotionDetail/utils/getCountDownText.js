import { VoucherStatus } from '@/components/voucher/Voucher';
import { PROMOTION_TYPE } from '@/config/User/promotion';
import { RedeemableType } from '@/hook/user/usePromotions';
import { isExpired } from './util';

export const Promotion_Recuring_Translation = {
  '-1': 'promotion_reset_daily',
  0: 'promotion_reset_sun',
  1: 'promotion_reset_mon',
  2: 'promotion_reset_tue',
  3: 'promotion_reset_wed',
  4: 'promotion_reset_thu',
  5: 'promotion_reset_fri',
  6: 'promotion_reset_sat',
};

export const getCountDownText = (t, currentPromotion, status) => {
  switch (currentPromotion.type) {
    // PROMOTION_TYPE.RedepositInsurance
    case PROMOTION_TYPE.RedepositInsurance:
      switch (status) {
        case RedeemableType.pending:
          return {
            text: t(
              Promotion_Recuring_Translation[currentPromotion.recurring_day]
            ),
            time: currentPromotion?.reset_at,
          };
        case RedeemableType.available:
          return {
            text: t('promotionClaimExpiry'),
            time: currentPromotion?.claim_status?.claim_end,
          };
        case RedeemableType.done:
          if (
            !isExpired(currentPromotion?.voucher?.end_at * 1000) &&
            currentPromotion?.voucher?.status ===
              VoucherStatus.VoucherStatusReady
          ) {
            return {
              text: t('promotionVoucherExpiry'),
              time: currentPromotion?.voucher?.end_at,
            };
          } else if (
            currentPromotion?.voucher?.status ===
            VoucherStatus.VoucherStatusRedeemed
          ) {
            return {
              text: t(
                Promotion_Recuring_Translation[currentPromotion.recurring_day]
              ),
              time: currentPromotion?.reset_at,
            };
          } else {
            return {
              text: t(
                Promotion_Recuring_Translation[currentPromotion.recurring_day]
              ),
              time: currentPromotion?.reset_at,
            };
          }
      }
      break;
    // PROMOTION_TYPE.AccuralReward:
    case PROMOTION_TYPE.AccuralReward:
      return {
        text: t(Promotion_Recuring_Translation[currentPromotion.recurring_day]),
        time: currentPromotion?.reset_at,
      };
    // PROMOTION_TYPE.FirstDepositInsurance
    case PROMOTION_TYPE.FirstDepositInsurance:
      switch (status) {
        case RedeemableType.available:
          return {
            text: t('promotionClaimExpiry'),
            time: currentPromotion?.claim_status?.claim_end,
          };
        case RedeemableType.done:
          if (!isExpired(currentPromotion?.voucher?.end_at * 1000)) {
            return {
              text: t('promotionVoucherExpiry'),
              time: currentPromotion?.voucher?.end_at,
            };
          }
      }
      break;
    // PROMOTION_TYPE.FirstDepositBonus
    case PROMOTION_TYPE.FirstDepositBonus:
      switch (status) {
        case RedeemableType.available:
          return {
            text: t('redeemExpiry'),
            time: currentPromotion?.claim_status?.claim_end,
          };
      }
  }

  return {};
};
