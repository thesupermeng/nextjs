import {useDispatch, useSelector} from 'react-redux';
import {setShowPayment} from '@/store/yingshiScreen';

export const usePaymentOpen = () => {
  const getIsShowPayment = (state) => state.yingshiScreen.isShowPayment;
  const isShowPayment = useSelector(getIsShowPayment);
  const dispatch = useDispatch();
  const setLoginOpen = (d) => dispatch(setShowPayment(d));

  return [isShowPayment, setLoginOpen]
}
