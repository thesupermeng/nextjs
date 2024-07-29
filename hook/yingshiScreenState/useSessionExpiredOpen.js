import {useDispatch, useSelector} from 'react-redux';
import { setIsSessionExpired} from '@/store/yingshiScreen';

export const useSessionExpiredOpen = () => {
  const getIsSessionExpired = (state) => state.yingshiScreen.isSessionExpired;
  const isSessionExpired = useSelector(getIsSessionExpired);
  const dispatch = useDispatch();
  const setSessionExpiredOpen = (d) => dispatch(setIsSessionExpired(d));

  return [isSessionExpired, setSessionExpiredOpen]
}
