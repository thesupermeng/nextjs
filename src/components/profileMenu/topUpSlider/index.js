'use client';
import { RightSidebarContantTypes } from '@/components/rightSideMenu';
import { selectProfileMenu } from '@/store/profile';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TopUpHeader from './components/topUpHeader';
import { WithdrawOption } from './components/withdrawOption';
import { WithdrawSummary } from './components/withdrawSummary';
import TopUp from './topUp';
import WithdrawMethod from './components/withdrawMethod';
import { WithdrawBackHeader } from './components/withdrawBackHeader';
import { WithdrawConfirm } from './components/withdrawConfirm';
import { RightMenuLayout } from '@/components/rightMenuLayout';
import { ScrollContentVertical } from '@/components/ScrollContentVertical';
import { setWithdrawTab } from '@/store/common';

export const WithdrawTab = {
  TOP_UP: 0,
  WITHDRAW_OPTION: 'Withdraw Option',
  WITHDRAW_SUMMARY: 'Withdraw Summary',
  WITHDRAW_METHOD: 'Withdraw Method',
  WITHDRAW_SUCCESS: 'Withdraw Success',
};

const TopUpSlider = () => {
  const { profileMenuSelected } = useSelector((s) => s.profile);
  const { withdrawTab, withdrawModal } = useSelector((s) => s.common);
  const { rightBarContent } = useSelector((s) => s.common);
  const dispatch = useDispatch();

  useEffect(() => {
    if (rightBarContent[RightSidebarContantTypes.Deposit]) {
      dispatch(selectProfileMenu(1));
    } else if (rightBarContent[RightSidebarContantTypes.Withdrawal]) {
      dispatch(selectProfileMenu(2));
    }
    return () => {
      dispatch(setWithdrawTab(WithdrawTab.TOP_UP));
    };
  }, [rightBarContent]);

  return (
    <RightMenuLayout>
      {withdrawTab === WithdrawTab.WITHDRAW_OPTION ||
      withdrawTab === WithdrawTab.WITHDRAW_METHOD ||
      withdrawTab === WithdrawTab.WITHDRAW_SUMMARY ? (
        <WithdrawBackHeader label={withdrawTab} />
      ) : (
        <TopUpHeader />
      )}

      <ScrollContentVertical>
        {withdrawTab === WithdrawTab.WITHDRAW_OPTION && <WithdrawOption />}
        {withdrawTab === WithdrawTab.TOP_UP && <TopUp />}
        {withdrawTab === WithdrawTab.WITHDRAW_METHOD && <WithdrawMethod />}
        {withdrawTab === WithdrawTab.WITHDRAW_SUMMARY && <WithdrawSummary />}
      </ScrollContentVertical>
    </RightMenuLayout>
  );
};

export default TopUpSlider;
