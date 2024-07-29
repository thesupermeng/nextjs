import {useDispatch, useSelector} from 'react-redux';
import {setShowLogin, setShowLoginSuccess} from '@/store/yingshiScreen';

export const useLoginSuccessOpen = () => {
  const getIsLoginOpen = (state) => state.yingshiScreen.isShowLoginSuccess;
  const isLoginSuccessOpen = useSelector(getIsLoginOpen);
  const dispatch = useDispatch();
  const setLoginSuccessOpen = (d) => dispatch(setShowLoginSuccess(d));

  return [isLoginSuccessOpen, setLoginSuccessOpen]
}
