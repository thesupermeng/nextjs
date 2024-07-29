import { Back, BackHover } from '@/asset/icons';
import Image from 'next/image';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WithdrawTab } from '../..';
import { setWithdrawTab } from '@/store/common';

export const WithdrawBackHeader = ({ label, right = null }) => {
  const { withdrawTab, withdrawModal } = useSelector((s) => s.common);
  const dispatch = useDispatch();

  const back = () => {
    if (withdrawTab === WithdrawTab.WITHDRAW_OPTION) {
      dispatch(setWithdrawTab(WithdrawTab.TOP_UP));
    }
    if (withdrawTab === WithdrawTab.WITHDRAW_METHOD) {
      dispatch(setWithdrawTab(WithdrawTab.WITHDRAW_OPTION));
    }

    if (withdrawTab === WithdrawTab.WITHDRAW_SUMMARY) {
      dispatch(setWithdrawTab(WithdrawTab.TOP_UP));
    }
  };
  return (
    <div className='mb-5 flex justify-between p-4'>
      <div className='flex items-center gap-2'>
        <Image
          src={BackHover}
          alt='back'
          width={40}
          height={40}
          onClick={back}
          className='w-10 h-10 opacity-20 hover:opacity-100 cursor-pointer'
        />
        <p className='text-base'>{label}</p>
      </div>
      {right}
    </div>
  );
};
