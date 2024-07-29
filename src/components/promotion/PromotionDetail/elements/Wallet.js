import { BalWallet } from '@/asset/icons';
import Image from 'next/image';

export const Wallet = ({ left, right }) => {
  return (
    <div className='flex w-full flex-row justify-between mb-2 items-center gap-1.5'>
      <Image src={BalWallet} alt='deposit' className='mr-2' />
      <div className='text-sm'>{left}</div>
      <div className='flex-1' />
      <div className='text-base font-semibold text-white'>{right}</div>
    </div>
  );
};
