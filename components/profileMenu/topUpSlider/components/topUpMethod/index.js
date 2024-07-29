import {
  ArrowRight,
  CheckBox0,
  CheckBoxRed,
  Wallet,
  USDT,
} from '@/asset/icons';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/navigation';
import { isWeb } from '@/util/common';
import { setWithdrawTab } from '@/store/common';
import { WithdrawTab } from '../..';
import { setSelectedId, setSelectedWithdrawAcc } from '@/store/withdraw';
import { RouterH5 } from '@/util/routes';
import { formatCreditWholeNum } from '@/util/numbers';
import useWithdrawInfo from '@/hook/user/useWithdrawInfo';

export default function TopUpMethod() {
  const [isTick, setIsTick] = useState(0);
  const { profileMenuSelected } = useSelector((s) => s.profile);
  const { selectedAcc } = useSelector((s) => s.withdraw);
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { topupMethod, withdrawAcc } = useWithdrawInfo();
  const selectWithdrawOption = () => {
    if (isWeb()) {
      dispatch(setWithdrawTab(WithdrawTab.WITHDRAW_OPTION));
    } else {
      router.push(RouterH5.withdrawOption);
    }
  };

  useEffect(() => {
    if (withdrawAcc?.length > 0 && selectedAcc?.id) {
      const foundItem = withdrawAcc?.find(
        (item) => item?.id === selectedAcc?.id
      );
      if (!foundItem) {
        dispatch(setSelectedWithdrawAcc(null));
      }
    }
  }, [withdrawAcc, selectedAcc]);

  useEffect(() => {
    if (isTick) dispatch(setSelectedId(isTick));
  }, [isTick]);

  useEffect(() => {
    if (profileMenuSelected === 1) {
      setIsTick(topupMethod?.[0]);
    }
  }, [topupMethod]);

  return (
    <div className='mt-4 flex flex-col'>
      <p className={`mb-2 ${isWeb() ? 'text-sm' : 'text-xs'}`}>
        {profileMenuSelected === 1 ? t('typesOfPayment') : t('withdrawTo')}
      </p>

      {profileMenuSelected === 1 &&
        topupMethod.map((m, index) => {
          return (
            <div
              className=' rounded-xl flex justify-between px-5 py-3.5 bg-tayaGrey my-2 hover:cursor-pointer'
              key={m.id}
              onClick={() => setIsTick(m)}
            >
              <div className='flex items-center gap-3'>
                <Image
                  className='rounded-[4px] w-[26px] h-[26px]'
                  src={m.icon_url}
                  alt='payment-icon'
                  width={26}
                  height={26}
                  onError={(e) => (e.target.src = USDT.src)}
                />
                <p className='text-[13px]'>{m.name}</p>
              </div>
              <Image
                alt='check'
                src={isTick?.id === m.id ? CheckBoxRed : CheckBox0}
                className='cursor-pointer'
              />
            </div>
          );
        })}

      {profileMenuSelected === 2 && (
        <div
          className='rounded-xl flex px-5 py-3.5 bg-tayaGrey my-2 justify-between cursor-pointer gap-2'
          onClick={selectWithdrawOption}
        >
          {selectedAcc?.account_name ? (
            <>
              <Image
                src={selectedAcc?.method?.icon_url}
                width={30}
                height={30}
                alt='icon'
                className='w-[30px] h-[30px] self-center'
                onError={(e) => (e.target.src = USDT.src)}
              />
              <div className='flex-1 flex-col truncate'>
                <p className='text-sm truncate'>{selectedAcc?.account_name}</p>
                <p className='opacity-50 text-xs truncate text-ellipsis'>
                  {selectedAcc?.account_number}
                </p>
              </div>
            </>
          ) : (
            <div className='flex gap-2 '>
              <Image src={Wallet} width={30} height={30} alt='wallet' />
              <div className='flex flex-col '>
                <p className='text-sm'>{t('withdrawalOption')}</p>
                <p className='opacity-50 text-xs'>
                  {t('selectWithdrawalMethod')}
                </p>
              </div>
            </div>
          )}

          <Image src={ArrowRight} alt='arrow' height={20} width={30} />
        </div>
      )}

      {profileMenuSelected === 1 && (
        <p className='text-[13px] font-medium my-2'>
          *{t('topUpRange')}: {formatCreditWholeNum(isTick?.min_amount)} USDT (
          {t('minimum')}) to {formatCreditWholeNum(isTick?.max_amount)} USDT (
          {t('maximum')})
        </p>
      )}
    </div>
  );
}
