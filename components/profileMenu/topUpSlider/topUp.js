'use client';
import { RightSidebarContantTypes } from '@/components/rightSideMenu';
import useUser from '@/hook/user/useUser';
import { selectProfileMenu } from '@/store/profile';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTopUpAmt from './components/customTopUpAmt';
import QuickTopUp from './components/quickTopUp';
import TopUpMethod from './components/topUpMethod';
import AbsoluteModal from './components/absoluteModal/absoluteModal';
import { setWithdrawAmt } from '@/store/withdraw';
import { setDepositAmt } from '@/store/deposit';
import { BalanceHeader } from './components/balanceHeader';

const TopUp = () => {
  const { qtpSelected, profileMenuSelected } = useSelector((s) => s.profile);
  const { depositAmt } = useSelector((s) => s.deposit);
  const { selectedAcc, selectedMethodId, withdrawAmt } = useSelector(
    (s) => s.withdraw
  );
  const { rightBarContent } = useSelector((s) => s.common);

  const [topUpAmt, setTopUpAmt] = useState(depositAmt);
  const [withdrawalAmt, setWithdrawalAmt] = useState(withdrawAmt);

  const [isDisabled, setIsDisabled] = useState(true);

  const dispatch = useDispatch();
  const { user } = useUser();

  useEffect(() => {
    if (rightBarContent[RightSidebarContantTypes.Deposit]) {
      dispatch(selectProfileMenu(1));
    }

    if (rightBarContent[RightSidebarContantTypes.Withdrawal]) {
      dispatch(selectProfileMenu(2));
    }
  }, []);

  useEffect(() => {
    const amt = profileMenuSelected === 1 ? topUpAmt : withdrawalAmt;
    const rules =
      profileMenuSelected === 1
        ? selectedMethodId?.id === 0
        : selectedAcc?.method === undefined;
    const withdrawable =
      profileMenuSelected === 1
        ? amt < selectedMethodId?.min_amount ||
          amt > selectedMethodId?.max_amount
        : amt > user?.sum?.withdrawable ||
          amt < selectedAcc?.method?.min_amount ||
          amt > selectedAcc?.method?.max_amount;
    setIsDisabled(amt <= 0 || rules || withdrawable);
  }, [
    topUpAmt,
    withdrawalAmt,
    profileMenuSelected,
    selectedMethodId,
    selectedAcc,
  ]);

  useEffect(() => {
    if (profileMenuSelected === 1) {
      dispatch(setDepositAmt(topUpAmt));
    } else if (profileMenuSelected === 2) {
      dispatch(setWithdrawAmt(withdrawalAmt));
    }
  }, [topUpAmt, withdrawalAmt, profileMenuSelected]);

  return (
    <>
      <div className='flex flex-1 flex-col px-4'>
        <BalanceHeader />
        {profileMenuSelected === 1 && (
          <QuickTopUp
            setQuickTopUpAmt={setTopUpAmt}
            quickTopUpAmt={topUpAmt}
            qtpSelected={qtpSelected}
          />
        )}

        {profileMenuSelected === 2 && (
          <CustomTopUpAmt
            selectedAmt={withdrawalAmt}
            setTopUpAmt={setWithdrawalAmt}
          />
        )}

        {profileMenuSelected === 2 && <TopUpMethod />}

        {profileMenuSelected === 1 && (
          <CustomTopUpAmt selectedAmt={topUpAmt} setTopUpAmt={setTopUpAmt} />
        )}

        {profileMenuSelected === 1 && <TopUpMethod />}
      </div>
      <AbsoluteModal
        isDisabled={isDisabled}
        profileMenuSelected={profileMenuSelected}
        amount={profileMenuSelected === 1 ? topUpAmt : withdrawalAmt}
      />
    </>
  );
};

export default TopUp;
