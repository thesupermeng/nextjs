import {
  ProfileDeposit,
  ProfileHistory,
  ProfileTransaction,
  ProfileWithdraw,
} from '@/asset/icons';
import { Count } from '@/components/count';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const BALANCE_OPTIONS = {
  deposit: 'deposit',
  withdraw: 'withdraw',
  orderHistory: 'orderHistory',
  transaction: 'transaction',
};

export const BalanceOption = ({ icon, text, link, type, ...props }) => {
  const { t } = useTranslation();

  return (
    <Link href={link}>
      <div
        className='flex gap-2 rounded-[10px] bg-tayaGrey py-4 px-2.5'
        {...props}
      >
        <div className='relative'>
          <Image alt={text} src={icon} className='w-6 h-6' />
          <Count type={type} className={'absolute -right-1 -top-2'} />
        </div>
        <div className='font-medium text-[15px] truncate'>{t(text)}</div>
      </div>
    </Link>
  );
};

export const BalanceOptions = () => {
  return (
    <div className='grid grid-cols-2 grid-rows-2 gap-2'>
      <BalanceOption
        icon={ProfileDeposit}
        text={BALANCE_OPTIONS.deposit}
        link='/user/deposit'
        id='deposit-button'
      />
      <BalanceOption
        icon={ProfileWithdraw}
        text={BALANCE_OPTIONS.withdraw}
        link='/user/withdraw'
      />
      <BalanceOption
        icon={ProfileHistory}
        text={BALANCE_OPTIONS.orderHistory}
        link='/user/history'
        type={1}
      />
      <BalanceOption
        icon={ProfileTransaction}
        text={BALANCE_OPTIONS.transaction}
        link='/user/transaction'
        type={2}
      />
    </div>
  );
};
