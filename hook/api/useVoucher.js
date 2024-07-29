import { URL_USER } from '@/config/url';
import { UserApi } from '@/util/UserApi';

export const useVoucher = () => {
  const getApplicables = async (transactionDetails) => {
    return UserApi(
      URL_USER.getApplicables,
      {
        type: 'fb',
        transaction_detail: transactionDetails,
      },
      { excludeInSignature: true }
    );
  };

  const preBinding = async (transactionDetails, voucherId) => {
    return UserApi(
      URL_USER.postPreBinding,
      {
        transaction_detail: transactionDetails,
        voucher_id: voucherId,
        type: 'fb',
      },
      { excludeInSignature: true }
    );
  };

  const checkExpired = (voucherInfo) => {
    const currentTime = Date.now();

    return (
      voucherInfo?.id &&
      !(
        currentTime >= voucherInfo.start_at * 1000 &&
        currentTime <= voucherInfo.end_at * 1000
      )
    );
  };

  return { getApplicables, preBinding, checkExpired };
};
