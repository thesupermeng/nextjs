import { VoucherStatus } from '@/components/voucher/Voucher';
import { PROMOTION_TYPE } from '@/config/User/promotion';
import { RedeemableType } from '@/hook/user/usePromotions';
import { RedeemBtnStyle } from '../elements/Card';
import { Unit } from '@/config/User/setting';
import { isExpired } from './util';

export const getCardContent = (t, promotion, status, currentTier = 0) => {
  // console.log('local', promotion, status);
  switch (promotion.type) {
    // PROMOTION_TYPE.RedepositInsurance
    case PROMOTION_TYPE.RedepositInsurance:
      switch (status) {
        case RedeemableType.pending:
          return {
            preText: `${t('discoverGamingWithReloadInsuranceBonus')} ${t(
              'yourBetsAreProtected'
            )}`,
            btnText: t('pendingDeposit'),
            btnType: RedeemBtnStyle.PENDING,
          };
        case RedeemableType.available:
          if (
            !promotion?.claim_status?.has_claimed &&
            isExpired(promotion?.claim_status?.claim_end * 1000)
          ) {
            // available, expired
            return {
              preText: t('yourBetsAreProtected'),
              postText: t('afterClaimingApplyYourVoucher'),
              btnText: t('claimExpired'),
              btnType: RedeemBtnStyle.DONE,
            };
          }
          // available, not expired
          else
            return {
              preText: t('yourBetsAreProtected'),
              postText: t('afterClaimingApplyYourVoucher'),
              btnText: `${t('claimAmountReloadBonus', {
                amount: promotion.reward,
                unit: Unit,
              })}`,
              btnType: RedeemBtnStyle.ACTION,
            };
        case RedeemableType.done:
          if (promotion?.voucher?.status === VoucherStatus.VoucherStatusReady) {
            if (isExpired(promotion?.voucher?.end_at * 1000)) {
              return {
                preText: t('voucherAlreadyExpired'),
                btnText: t('voucherExpired'),
                btnType: RedeemBtnStyle.DONE,
              };
            } else {
              return {
                preText: t('voucherAlreadyClaimed'),
                postText: t('applyYourVoucherInBetSlip'),
                btnText: t('useNow'),
                btnType: RedeemBtnStyle.USENOW,
              };
            }
          } else if (
            promotion?.voucher?.status === VoucherStatus.VoucherStatusRedeemed
          ) {
            return {
              preText: t('youveAlreadyRedeemedTheDepositBonusPromo'),
              btnText: t('redeemed'),
              btnType: RedeemBtnStyle.DONE,
            };
          } else {
            //voucher pending
            return {
              preText: t('youveAlreadyRedeemedTheDepositBonusPromo'),
              btnText: t('redeemed'),
              btnType: RedeemBtnStyle.DONE,
            };
          }
      }
      break;
    // case PROMOTION_TYPE.AccuralReward:
    case PROMOTION_TYPE.AccuralReward:
      {
        const cur = promotion?.promotion_progress?.progress;
        const nextMin =
          promotion?.promotion_progress?.tiers[currentTier + 1]?.min || 0;
        const nextReward =
          promotion?.promotion_progress?.tiers[currentTier + 1]?.reward || 0;
        const preText = nextMin ? (
          <>
            <p>
              {t('topUp')}: {cur}/{nextMin} {Unit}
            </p>
            <p>
              {t('forAdditionalAmountReceive', {
                amount: nextMin - cur,
                reward: nextReward,
                unit: Unit,
              })}
            </p>
          </>
        ) : null;

        switch (status) {
          case RedeemableType.pending:
            return {
              preText,
              // todo change translatation to Top Up 15 USDT
              btnText: `${t('pending')}: ${t('topUpAmountToRedeem', {
                amount: nextMin - cur,
                unit: Unit,
              })}`,
              btnType: RedeemBtnStyle.PENDING,
            };
          case RedeemableType.available:
            return {
              btnText: `${t('redeem')} ${promotion?.reward} ${Unit}`,
              btnType: RedeemBtnStyle.ACTION,
            };
          case RedeemableType.done:
            return {
              preText: t('youveAlreadyRedeemedTheDepositBonusPromo'),
              btnText: t('redeemed'),
              btnType: RedeemBtnStyle.DONE,
            };
        }
      }
      // PROMOTION_TYPE.RedepositInsurance
      break;
    case PROMOTION_TYPE.FirstDepositInsurance:
      switch (status) {
        case RedeemableType.pending:
          return {
            preText: `${t('experienceWorryFreeGaming')} ${t(
              'yourFirstDepositIsCovered'
            )}`,
            btnText: t('pendingFirstTopUp'),
            btnType: RedeemBtnStyle.PENDING,
          };
        case RedeemableType.available:
          if (!promotion?.claim_status?.has_claimed) {
            // not yet claimed
            if (isExpired(promotion?.claim_status?.claim_end * 1000)) {
              return {
                preText: t('yourFirstDepositIsCovered'),
                postText: t('afterClaimingApplyYourVoucher'),
                btnText: t('claimExpired'),
                btnType: RedeemBtnStyle.DONE,
              };
            } else {
              return {
                preText: t('yourFirstDepositIsCovered'),
                postText: t('afterClaimingApplyYourVoucher'),
                btnText: `${t('claimAmountBetInsurance', {
                  amount: promotion.reward,
                  unit: Unit,
                })}`,
                btnType: RedeemBtnStyle.ACTION,
              };
            }
          } else if (
            promotion?.voucher?.amount > 0 &&
            promotion?.voucher?.status === VoucherStatus.VoucherStatusReady
          ) {
            return {
              preText: t('yourFirstDepositIsCovered'),
              postText: t('afterClaimingApplyYourVoucher'),
              btnText: t('useNow'),
              btnType: RedeemBtnStyle.USENOW,
            };
          }
          break;
        case RedeemableType.done:
          if (isExpired(promotion?.voucher?.end_at * 1000)) {
            return {
              preText: t('voucherAlreadyExpired'),
              btnText: t('voucherExpired'),
              btnType: RedeemBtnStyle.DONE,
            };
          } else {
            if (
              promotion?.voucher?.status === VoucherStatus.VoucherStatusReady
            ) {
              return {
                preText: t('voucherAlreadyClaimed'),
                postText: t('applyYourVoucherInBetSlip'),
                btnText: t('useNow'),
                btnType: RedeemBtnStyle.USENOW,
              };
            } else if (
              promotion?.voucher?.status === VoucherStatus.VoucherStatusRedeemed
            ) {
              return {
                preText: t('youveAlreadyRedeemedTheDepositBonusPromo'),
                btnText: t('redeemed'),
                btnType: RedeemBtnStyle.DONE,
              };
            }
          }
      }
      break;
    case PROMOTION_TYPE.FirstDepositBonus:
      switch (status) {
        case RedeemableType.pending:
          return {
            preText: `${t('enjoyGamingWithFirstDepositBonus')} ${t(
              'yourBetsAreProtected'
            )}`,
            btnText: t('pendingFirstTopUp'), //todo-xl: check if need to change mismatch key and value. (excel sheet is 'Pending First Deposit')
            btnType: RedeemBtnStyle.PENDING,
          };
        case RedeemableType.available:
          if (
            !promotion?.claim_status?.has_claimed &&
            !isExpired(promotion?.claim_status?.claim_end * 1000)
          ) {
            return {
              preText: t('claimYourFirstDepositBonus'),
              btnText: `${t('redeem')} ${promotion?.reward} ${Unit}`,
              btnType: RedeemBtnStyle.ACTION,
            };
          } else {
            return {
              btnText: t('redeemExpired'),
              btnType: RedeemBtnStyle.DONE,
            };
          }
        case RedeemableType.done:
          return {
            preText: t('youveAlreadyRedeemedTheDepositBonusPromo'),
            btnText: t('redeemed'),
            btnType: RedeemBtnStyle.DONE,
          };
      }
  }
  return { preText: null, postText: null, btnText: '', btnStyle: '' };
};
