import { CrossWhite } from '@/asset/icons';
import { RightSidebarContantTypes } from '@/components/rightSideMenu';
import {
  hideRightBarContent,
  setWithdrawTab,
  showRightBarContent,
} from '@/store/common';
import { selectProfileMenu } from '@/store/profile';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { Tab, WithdrawTab } from '../..';

const TopUpHeader = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onClose = () => {
    dispatch(hideRightBarContent('All'));
  };

  const { rightBarContent } = useSelector((s) => s.common);

  const { profileMenuSelected } = useSelector((s) => s.profile);

  const selectTopUpTabClick = () => {
    dispatch(hideRightBarContent('All'));
    dispatch(showRightBarContent(RightSidebarContantTypes.Deposit));
    // dispatch(selectProfileMenu(1));
  };

  const selectWithdrawalTabClick = () => {
    dispatch(hideRightBarContent('All'));
    dispatch(showRightBarContent(RightSidebarContantTypes.Withdrawal));
    // dispatch(selectProfileMenu(2));
  };

  useEffect(() => {
    dispatch(setWithdrawTab(WithdrawTab.TOP_UP));
  }, [profileMenuSelected]);

  return (
    <div className='my-3 flex justify-between p-4'>
      <div>
        <button onClick={selectTopUpTabClick}>
          <div
            className={
              profileMenuSelected === 1
                ? 'mr-2 text-base text-tayaRed font-medium'
                : 'mr-2 text-base text-white/[.5]'
            }
          >
            {t('topUp')}
          </div>
          {profileMenuSelected === 1 && (
            <div className='h-[0.1875rem] w-6 rounded-t-2xl bg-tayaRed ml-auto mr-auto mt-1'></div>
          )}
        </button>
        <button onClick={selectWithdrawalTabClick} className='ml-4'>
          <div
            className={
              profileMenuSelected === 2
                ? 'mr-2 text-base text-tayaRed font-medium'
                : 'mr-2 text-base text-white/[.5]'
            }
          >
            {t('withdraw')}
          </div>
          {profileMenuSelected === 2 && (
            <div className='h-[0.1875rem] w-6 rounded-t-2xl bg-tayaRed ml-auto mr-auto mt-1'></div>
          )}
        </button>
      </div>
      <button onClick={onClose}>
        <Image
          className='w-9 h-9 opacity-20 hover:opacity-100'
          src={CrossWhite}
          alt='close'
        />
      </button>
    </div>
  );
};

export default TopUpHeader;
