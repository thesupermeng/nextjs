import { BalWallet } from '@/asset/icons';
import useUser from '@/hook/user/useUser';
import { formatCredit } from '@/util/numbers';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { USDT } from '@/asset/icons';
import { useSelector } from 'react-redux';
import { Line } from 'rc-progress';
import { Unit } from '@/config/User/setting';

export const BalanceHeader = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const { profileMenuSelected } = useSelector((s) => s.profile)
  return (
    <div className='rounded-xl flex flex-col justify-between px-4 py-5 bg-tayaGrey'>
      <div className='flex justify-between'>
        <div className='flex items-center'>
          <Image src={BalWallet} alt='wallet' />
          <p className=' text-sm ml-1.5 font-medium'>{t('yourBalance')}</p>
        </div>
        <div className='flex items-center'>
          <p className=' font-bold ml-1.5 mr-2'>
            {formatCredit(user?.sum?.balance, false)}
          </p>
          <Image src={USDT} alt='usdt' />
        </div>
      </div>
      {
        profileMenuSelected === 2 &&
        <>
          {/* <Line
            className={`h-[5px] my-2`}
            strokeWidth={3}
            trailWidth={3}
            percent={user?.sum?.withdrawable/user?.sum?.balance}
            strokeColor={`#DE173E`}
            trailColor='#27282D'
          /> */}
          <div className='text-sm mt-2'>
            <span>{t('withdrawableAmount')}: </span>
            <span>{user?.sum?.withdrawable} {Unit}</span>
          </div>
        </>
      }
    </div>
  );
};
