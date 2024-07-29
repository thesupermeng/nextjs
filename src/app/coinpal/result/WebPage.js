import Home from '@/app/home/page';
import { RightSidebarContantTypes } from '@/components/rightSideMenu';
import { showRightBarContent } from '@/store/common';
import { setRechargeInfo } from '@/store/recharge';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const WebPage = ({ receivedParams }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (receivedParams) {
      dispatch(setRechargeInfo(receivedParams));
      dispatch(showRightBarContent(RightSidebarContantTypes.RechargeInfo));
    }
  }, [receivedParams]);

  return <Home />;
};
