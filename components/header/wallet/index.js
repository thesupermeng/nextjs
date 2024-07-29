import useUser from '@/hook/user/useUser';
import { formatCredit } from '@/util/numbers';
import Image from 'next/image';
import Icon from './Wallet.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setBalance } from '@/store/user';
import { Unit } from '@/config/User/setting';

const Wallet = () => {
  const { user } = useUser();
  // const { balance } = useSelector((s) => s.user);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (user) {
  //     dispatch(setBalance(user?.sum?.balance));
  //   }
  // }, [user]);

  return (
    <div className='flex flex-initial rounded-[2.5rem] bg-white/5 place-content-center py-3 px-4'>
      <Image
        className='w-[24px] h-[24px] mt-auto mb-auto mr-2'
        alt='wallet'
        src={Icon}
      />
      <div className='text-white text-base font-semibold'>
        {formatCredit(user?.sum?.balance, true)}
      </div>
      {/* <div className='w-[2.8125rem] h-[2.8125rem] flex flex-initial rounded-[2.5rem] bg-tayaRed place-content-center'>
        <Image alt='wallet' src={Icon} className='w-' />
      </div> */}
    </div>
  );
};

export default Wallet;
