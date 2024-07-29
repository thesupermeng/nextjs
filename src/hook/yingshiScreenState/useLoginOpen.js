import {useDispatch, useSelector} from 'react-redux';
import {setShowLogin} from '@/store/yingshiScreen';

export const useLoginOpen = () => {
  const getIsLoginOpen = (state) => state.yingshiScreen.isShowLogin;
  const isLoginOpen = useSelector(getIsLoginOpen);
  const dispatch = useDispatch();
  const setLoginOpen = (d) => dispatch(setShowLogin(d));

  return [isLoginOpen, setLoginOpen]
}
