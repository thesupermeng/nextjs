import {useDispatch, useSelector} from 'react-redux';
import {setShowPin, setShowPinSuccess} from '@/store/yingshiScreen';

export const usePinSuccessOpen = () => {
  const getIsPinOpen = (state) => state.yingshiScreen.isShowPinSuccess;
  const isPinSuccessOpen = useSelector(getIsPinOpen);
  const dispatch = useDispatch();
  const setPinSuccessOpen = (d) => dispatch(setShowPinSuccess(d));

  return [isPinSuccessOpen, setPinSuccessOpen]
}
