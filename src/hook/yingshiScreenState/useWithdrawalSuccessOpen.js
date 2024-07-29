import {useDispatch, useSelector} from 'react-redux';
import {setShowWithdrawal, setShowWithdrawalSuccess} from '@/store/yingshiScreen';

export const useWithdrawalSuccessOpen = () => {
  const getIsWithdrawalOpen = (state) => state.yingshiScreen.isShowWithdrawalSuccess;
  const isWithdrawalSuccessOpen = useSelector(getIsWithdrawalOpen);
  const dispatch = useDispatch();
  const setWithdrawalSuccessOpen = (d) => dispatch(setShowWithdrawalSuccess(d));

  return [isWithdrawalSuccessOpen, setWithdrawalSuccessOpen]
}
