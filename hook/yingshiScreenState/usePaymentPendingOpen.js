import {useDispatch, useSelector} from 'react-redux';
import {setShowPaymentPending} from '@/store/yingshiScreen';

export const usePaymentPendingOpen = () => {
  const getIsShowPaymentPending = (state) => state.yingshiScreen.isShowPaymentPending;
  const isShowPaymentPending = useSelector(getIsShowPaymentPending);
  const dispatch = useDispatch();
  const internalSetShowPaymentPending = (d) => dispatch(setShowPaymentPending(d));

  return [isShowPaymentPending, internalSetShowPaymentPending]
}
