'use client';
import useUser from '@/hook/user/useUser';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTopUpAmt from './components/customTopUpAmt';
import QuickTopUp from './components/quickTopUp';
import TopUpMethod from './components/topUpMethod';
import AbsoluteModal from './components/absoluteModal/absoluteModal';
import { setKeyboardProps, showKeyboard } from '@/store/common';
import { BalanceHeader } from './components/balanceHeader';
import { setWithdrawAmt } from '@/store/withdraw';
import { setDepositAmt } from '@/store/deposit';

const H5TopUpSlider = ({ amount, setAmount }) => {
  const { qtpSelected, profileMenuSelected } = useSelector((s) => s.profile);
  const [isDisabled, setIsDisabled] = useState(true);
  const { user } = useUser();
  const dispatch = useDispatch();
  const { selectedAcc, selectedMethodId } = useSelector((s) => s.withdraw);

  useEffect(() => {
    const amt = amount;
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
  }, [amount, profileMenuSelected, selectedMethodId, selectedAcc]);

  useEffect(() => {
    if (profileMenuSelected === 1) {
      dispatch(setDepositAmt(amount));
    } else if (profileMenuSelected === 2) {
      dispatch(setWithdrawAmt(amount));
    }
  }, [amount]);

  const keyboardConfig = {
    amount: amount,
    setAmount: (e) => setAmount(e),
  };

  useEffect(() => {
    dispatch(setKeyboardProps(keyboardConfig));
  }, [amount]);

  const triggerKeyboard = () => {
    dispatch(setKeyboardProps(keyboardConfig));
    dispatch(showKeyboard(true));
  };

  return (
    <div className='flex flex-col flex-1  bg-[#0E0F11]'>
      <div className='flex flex-col  overflow-y-auto flex-[1_0_0] mt-3 px-3'>
        <BalanceHeader />
        <CustomTopUpAmt
          id='custom-top-up'
          selectedAmt={amount}
          setTopUpAmt={setAmount}
          onClick={triggerKeyboard}
        />
        {profileMenuSelected === 1 && (
          <QuickTopUp
            setQuickTopUpAmt={setAmount}
            quickTopUpAmt={amount}
            qtpSelected={qtpSelected}
          />
        )}
        <TopUpMethod />
      </div>

      {/* absolute modal */}
      <AbsoluteModal
        profileMenuSelected={profileMenuSelected}
        isDisabled={isDisabled}
        amount={amount}
      />
    </div>
  );
};

export default H5TopUpSlider;
