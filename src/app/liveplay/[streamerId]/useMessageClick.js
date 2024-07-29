import { RightSidebarContantTypes } from '@/components/rightSideMenu';
import { showRightBarContent } from '@/store/common';
import { setDepositAmt } from '@/store/deposit';
import { setSelectedPromotionId } from '@/store/promotion';
import { isWeb } from '@/util/common';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

const IREDIRECT = {
  URL: 1,
  DEPOSIT: 2,
  PROMOTION: 3,
};

export const useMessageClick = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const onClickMessage = (msgData) => {
    if (msgData?.redirect_type === IREDIRECT.URL) {
      if (isWeb()) {
        window.open(msgData?.url);
      } else {
        router.push(msgData?.url);
      }
    } else if (msgData?.redirect_type === IREDIRECT.DEPOSIT) {
      dispatch(setDepositAmt(msgData?.url));
      if (isWeb()) {
        dispatch(showRightBarContent(RightSidebarContantTypes.Deposit));
      } else {
        router.push('/user/deposit');
      }
    } else if (msgData?.redirect_type === IREDIRECT.PROMOTION) {
      if (isWeb()) {
        dispatch(setSelectedPromotionId(msgData.url));
        dispatch(showRightBarContent(RightSidebarContantTypes.Promotion));
      } else {
        router.push(`/promotion/${msgData.url}`);
      }
    } else {
      return;
    }
  };
  return { onClickMessage };
};
